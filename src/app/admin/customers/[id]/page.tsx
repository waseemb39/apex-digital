import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import Link from "next/link";
import StageMap from "@/components/StageMap";
import type { ProjectStage } from "@/lib/types";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: profile } = await supabase
    .from("profiles")
    .select("business_name, full_name")
    .eq("id", id)
    .single();

  const name = profile?.business_name ?? profile?.full_name ?? "Customer";
  return { title: `${name} — Admin · Graft Digital` };
}

export default async function CustomerDetailPage({ params }: Props) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", id)
    .eq("role", "customer")
    .single();

  if (!profile) notFound();

  const { data: project } = await supabase
    .from("projects")
    .select("*, project_stages(*)")
    .eq("customer_id", id)
    .order("created_at", { ascending: false })
    .limit(1)
    .single();

  const stages: ProjectStage[] = project?.project_stages ?? [];

  return (
    <div className="space-y-8">
      {/* Breadcrumb */}
      <nav className="text-sm text-slate-500">
        <Link href="/admin" className="hover:text-slate-900 transition-colors">
          ← All Customers
        </Link>
      </nav>

      <div className="grid lg:grid-cols-[1fr_320px] gap-6 items-start">
        {/* Stage map */}
        <div className="bg-white border border-slate-200 rounded-xl p-6">
          <h2 className="text-base font-bold text-slate-900 mb-1">
            {project?.name ?? "No project yet"}
          </h2>
          <p className="text-slate-500 text-xs mb-6">
            Project stage map — read-only view
          </p>
          {stages.length > 0 ? (
            <StageMap
              stages={stages}
              version={project?.version ?? null}
            />
          ) : (
            <p className="text-slate-400 text-sm">No project stages found.</p>
          )}
        </div>

        {/* Profile sidebar */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-5">
          <h2 className="text-base font-bold text-slate-900">Customer Details</h2>

          <dl className="space-y-3">
            {[
              { label: "Business", value: profile.business_name },
              { label: "Name", value: profile.full_name },
              { label: "Email", value: profile.email },
              { label: "Phone", value: profile.phone },
              {
                label: "Joined",
                value: new Date(profile.created_at).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                }),
              },
            ].map(({ label, value }) => (
              <div key={label}>
                <dt className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  {label}
                </dt>
                <dd className="text-sm text-slate-800 mt-0.5">
                  {value ?? <span className="text-slate-400">—</span>}
                </dd>
              </div>
            ))}
          </dl>

          {project && (
            <div className="pt-4 border-t border-slate-200 space-y-3">
              <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Project
              </h3>
              <dl className="space-y-2">
                {[
                  { label: "Name", value: project.name },
                  { label: "Current Stage", value: project.current_stage },
                  { label: "Version", value: project.version },
                  {
                    label: "Last Updated",
                    value: new Date(project.updated_at).toLocaleDateString(
                      "en-GB",
                      { day: "numeric", month: "short", year: "numeric" }
                    ),
                  },
                ].map(({ label, value }) => (
                  <div key={label}>
                    <dt className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                      {label}
                    </dt>
                    <dd className="text-sm text-slate-800 mt-0.5">
                      {value ?? <span className="text-slate-400">—</span>}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
