// Owner: Website Owner | Purpose: Sign-out button — calls Supabase signOut on the client
"use client";

import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function SignOutButton() {
  const router = useRouter();

  async function handleSignOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.refresh();
    router.push("/login");
  }

  return (
    <button
      onClick={handleSignOut}
      className="text-sm text-slate-500 hover:text-slate-900 transition-colors"
    >
      Sign out
    </button>
  );
}
