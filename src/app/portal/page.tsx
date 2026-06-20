import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import StageMap from "@/components/StageMap";
import type { ProjectStage } from "@/lib/types";

export const metadata: Metadata = {
  title: "Client Portal — Graft Digital",
  description: "Track your website project progress.",
};

export default async function PortalPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Fetch the customer's profile (for their name).
  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, business_name")
    .eq("id", user!.id)
    .single();

  // Fetch their most recent project with all stage rows.
  const { data: project } = await supabase
    .from("projects")
    .select("*, project_stages(*)")
    .eq("customer_id", user!.id)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  const stages: ProjectStage[] = project?.project_stages ?? [];
  const firstName =
    profile?.full_name?.split(" ")[0] ??
    profile?.business_name ??
    "there";

  // Find the currently active stage for the "what's happening now" callout.
  const activeStage = stages.find(
    (s) => s.status === "in_progress" || s.status === "awaiting_approval"
  );

  const STAGE_LABELS: Record<string, string> = {
    onboarding: "Onboarding",
    content: "Content",
    design: "Design",
    development: "Development",
    qa: "QA",
    devops: "DevOps",
    launched: "Launched",
  };

  return (
    <div className="space-y-8">
      {/* Welcome header */}
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900">
          Welcome back, {firstName}!
        </h1>
        {project ? (
          <p className="text-slate-500 text-sm mt-1">
            Here&apos;s where your <span className="font-medium text-slate-700">{project.name}</span> project stands right now.
          </p>
        ) : (
          <p className="text-slate-500 text-sm mt-1">
            Your project is being set up. Check back soon!
          </p>
        )}
      </div>

      {project ? (
        <>
          {/* Active stage callout */}
          {activeStage && (
            <div className="bg-blue-50 border border-blue-200 rounded-xl px-5 py-4">
              <p className="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-1">
                Currently in progress
              </p>
              <p className="text-blue-900 font-bold text-sm">
                {STAGE_LABELS[activeStage.stage_key] ?? activeStage.stage_key} —{" "}
                {activeStage.status === "awaiting_approval"
                  ? "your approval is needed."
                  : "our team is working on this now."}
              </p>
            </div>
          )}

          {/* Launched callout */}
          {project.current_stage === "launched" &&
            stages.find((s) => s.stage_key === "launched")?.status === "complete" && (
              <div className="bg-green-600 rounded-xl px-5 py-4 text-white">
                <p className="text-xs font-semibold uppercase tracking-wider opacity-80 mb-1">
                  🎉 You&apos;re live!
                </p>
                <p className="font-bold text-lg">
                  Your website is launched
                  {project.version ? ` — ${project.version}` : ""}.
                </p>
              </div>
            )}

          {/* Stage map */}
          <div className="bg-white border border-slate-200 rounded-xl p-6">
            <h2 className="text-sm font-bold text-slate-700 mb-5 uppercase tracking-wider">
              Project Pipeline
            </h2>
            <StageMap stages={stages} version={project.version} />
          </div>

          {/* CTA */}
          <div className="text-center py-4">
            <p className="text-slate-500 text-sm mb-4">
              Questions about your project?
            </p>
            <a
              href="mailto:hello@graftdigital.co.uk"
              className="inline-flex items-center px-6 py-3 bg-orange-600 text-white font-bold rounded-lg hover:bg-orange-700 transition-colors text-sm"
            >
              Contact Your Project Manager →
            </a>
          </div>
        </>
      ) : (
        /* No project yet */
        <div className="bg-white border border-slate-200 rounded-xl p-10 text-center">
          <div className="text-4xl mb-4">🛠️</div>
          <h2 className="text-lg font-bold text-slate-900 mb-2">
            Your project is being prepared
          </h2>
          <p className="text-slate-500 text-sm max-w-sm mx-auto">
            Our team is setting everything up. You&apos;ll see your project
            pipeline here as soon as it&apos;s ready.
          </p>
        </div>
      )}
    </div>
  );
}
