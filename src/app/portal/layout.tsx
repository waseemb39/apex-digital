import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import AuthHeader from "@/components/AuthHeader";

export default async function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  // Admins should not land here — middleware handles this, but guard defensively.
  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (profile?.role === "admin") redirect("/admin");

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <AuthHeader title="Client Portal" homeHref="/portal" />
      <main className="flex-1 max-w-3xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
}
