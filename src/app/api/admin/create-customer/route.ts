// SERVER-ONLY route — uses SUPABASE_SERVICE_ROLE_KEY. Never runs in the browser.
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

function generateTempPassword(): string {
  const chars =
    "ABCDEFGHJKMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789";
  let pw = "Gd1!";
  for (let i = 0; i < 9; i++) {
    pw += chars[Math.floor(Math.random() * chars.length)];
  }
  return pw;
}

export async function POST(request: NextRequest) {
  // 1. Authenticate the caller.
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // 2. Verify the caller is an admin (authoritative DB check).
  const { data: callerProfile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (callerProfile?.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  // 3. Parse and validate the request body.
  let body: {
    fullName?: string;
    businessName?: string;
    email?: string;
    projectName?: string;
  };

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const { fullName, businessName, email, projectName } = body;
  if (!fullName || !businessName || !email || !projectName) {
    return NextResponse.json(
      { error: "fullName, businessName, email, and projectName are required" },
      { status: 400 }
    );
  }

  const tempPassword = generateTempPassword();
  const adminClient = createAdminClient();

  // 4. Create the auth user via the Supabase Admin API.
  //    Setting app_metadata.role ensures the JWT contains the role for
  //    middleware checks AND sets the role in the profiles trigger.
  const { data: newUserData, error: createError } =
    await adminClient.auth.admin.createUser({
      email,
      password: tempPassword,
      app_metadata: { role: "customer" },
      email_confirm: true, // skip the confirmation email for now
    });

  if (createError || !newUserData?.user) {
    return NextResponse.json(
      { error: createError?.message ?? "Failed to create user" },
      { status: 400 }
    );
  }

  const newUserId = newUserData.user.id;

  // 5. The trigger auto-inserted a profiles row. Update it with the details.
  //    We use adminClient so this bypasses RLS.
  const { error: profileError } = await adminClient
    .from("profiles")
    .update({
      full_name: fullName,
      business_name: businessName,
      role: "customer",
    })
    .eq("id", newUserId);

  if (profileError) {
    // Don't fail the whole request — the user was created; profile update is secondary.
    console.error("Profile update failed:", profileError.message);
  }

  // 6. Create the project. The seed_project_stages trigger auto-creates 7 stage rows.
  const { error: projectError } = await adminClient.from("projects").insert({
    customer_id: newUserId,
    name: projectName,
  });

  if (projectError) {
    return NextResponse.json(
      { error: "User created but project creation failed: " + projectError.message },
      { status: 500 }
    );
  }

  return NextResponse.json({
    success: true,
    userId: newUserId,
    tempPassword, // returned once so admin can share it; not stored in DB
  });
}
