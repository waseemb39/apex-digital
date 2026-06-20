import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import AuthHeader from "@/components/AuthHeader";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Defence-in-depth: middleware already blocks non-admins, but verify here too.
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  // Authoritative role check from the database (not just JWT).
  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (profile?.role !== "admin") redirect("/portal");

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <AuthHeader title="Admin Dashboard" homeHref="/admin" />
      <main className="flex-1 max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
}
