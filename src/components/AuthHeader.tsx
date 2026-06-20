// Owner: Website Owner | Purpose: Slim authenticated header for admin/portal pages
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import SignOutButton from "./SignOutButton";

interface Props {
  title: string;
  homeHref?: string;
}

export default async function AuthHeader({ title, homeHref = "/" }: Props) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href={homeHref} className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-green-600 flex items-center justify-center flex-shrink-0">
              <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
                <path
                  d="M2 12C2 12 4 7 7 5C10 3 12 4 12 4"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path
                  d="M7 5C7 5 7 2 10 2"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <circle cx="7" cy="5" r="1.5" fill="white" />
              </svg>
            </div>
            <span className="font-bold text-slate-900 text-sm">
              Graft<span className="text-green-600">Digital</span>
            </span>
          </Link>
          <span className="text-slate-300 hidden sm:block">·</span>
          <span className="text-slate-600 text-sm font-medium hidden sm:block">
            {title}
          </span>
        </div>

        <div className="flex items-center gap-4">
          {user?.email && (
            <span className="text-xs text-slate-400 hidden md:block truncate max-w-[180px]">
              {user.email}
            </span>
          )}
          <SignOutButton />
        </div>
      </div>
    </header>
  );
}
