// Owner: Website Owner | Purpose: Visual pipeline of all 7 project stages — used in portal and admin detail view
import type { ProjectStage, StageKey, StageStatus } from "@/lib/types";
import { CheckCircle2, Circle, Clock, Loader2, ThumbsUp } from "lucide-react";

const STAGE_META: Record<
  StageKey,
  { label: string; description: string; nextStep: string }
> = {
  onboarding: {
    label: "Onboarding",
    description: "We gather everything we need — brand assets, goals, and requirements.",
    nextStep: "Next: content strategy begins once onboarding is complete.",
  },
  content: {
    label: "Content",
    description: "Your website's words, structure, and messaging take shape.",
    nextStep: "Next: design starts once your content is approved.",
  },
  design: {
    label: "Design",
    description: "Visual mockups and design concepts created for your approval.",
    nextStep: "Next: development begins after you sign off on the design.",
  },
  development: {
    label: "Development",
    description: "Your site is built and brought to life in code.",
    nextStep: "Next: we hand it to QA for thorough testing.",
  },
  qa: {
    label: "QA",
    description: "Every page tested for speed, accessibility, and bugs.",
    nextStep: "Next: the site moves to deployment infrastructure.",
  },
  devops: {
    label: "DevOps",
    description: "Your site is configured and deployed to production.",
    nextStep: "Next: go live!",
  },
  launched: {
    label: "Launched",
    description: "Your website is live. Time to grow.",
    nextStep: "You're live! Check your analytics dashboard.",
  },
};

const STAGE_ORDER: StageKey[] = [
  "onboarding",
  "content",
  "design",
  "development",
  "qa",
  "devops",
  "launched",
];

function statusIcon(status: StageStatus, isActive: boolean) {
  if (status === "complete") {
    return <CheckCircle2 size={20} className="text-green-600" strokeWidth={2} />;
  }
  if (status === "approved") {
    return <ThumbsUp size={18} className="text-green-500" strokeWidth={2} />;
  }
  if (status === "awaiting_approval") {
    return <Clock size={18} className="text-amber-500" strokeWidth={2} />;
  }
  if (isActive || status === "in_progress") {
    return <Loader2 size={18} className="text-blue-600 animate-spin" strokeWidth={2} />;
  }
  return <Circle size={18} className="text-slate-300" strokeWidth={1.5} />;
}

function statusBadge(status: StageStatus, isActive: boolean) {
  if (status === "complete") {
    return (
      <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-green-100 text-green-700">
        Complete
      </span>
    );
  }
  if (status === "approved") {
    return (
      <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-green-50 text-green-600">
        Approved
      </span>
    );
  }
  if (status === "awaiting_approval") {
    return (
      <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-700">
        Awaiting approval
      </span>
    );
  }
  if (isActive || status === "in_progress") {
    return (
      <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-blue-100 text-blue-700">
        In progress
      </span>
    );
  }
  return (
    <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-400">
      Not started
    </span>
  );
}

function cardClasses(status: StageStatus, isActive: boolean) {
  if (isActive || status === "in_progress") {
    return "border-blue-400 bg-blue-50 shadow-sm";
  }
  if (status === "complete" || status === "approved") {
    return "border-green-300 bg-green-50/50";
  }
  if (status === "awaiting_approval") {
    return "border-amber-300 bg-amber-50/40";
  }
  return "border-slate-200 bg-white opacity-60";
}

interface Props {
  stages: ProjectStage[];
  version?: string | null;
  compact?: boolean;
}

export default function StageMap({ stages, version, compact = false }: Props) {
  // Sort by position so the order is always correct regardless of DB return order.
  const sorted = [...stages].sort((a, b) => a.position - b.position);

  // Find the active stage (first non-complete, non-not_started)
  const activeStage = sorted.find(
    (s) => s.status === "in_progress" || s.status === "awaiting_approval"
  );
  const activeKey = activeStage?.stage_key;

  return (
    <div className="space-y-3">
      {sorted.map((stage, idx) => {
        const meta = STAGE_META[stage.stage_key as StageKey];
        const isActive = stage.stage_key === activeKey;
        const isLaunched =
          stage.stage_key === "launched" && stage.status === "complete";

        return (
          <div key={stage.id}>
            {/* Connector line (not before first) */}
            {idx > 0 && (
              <div className="ml-[27px] w-0.5 h-3 bg-slate-200" />
            )}

            <div
              className={`flex items-start gap-4 p-4 rounded-xl border transition-all ${cardClasses(
                stage.status as StageStatus,
                isActive
              )}`}
            >
              {/* Step indicator */}
              <div className="flex-shrink-0 mt-0.5">
                {statusIcon(stage.status as StageStatus, isActive)}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-0.5">
                  <span
                    className={`text-sm font-bold ${
                      stage.status === "not_started" && !isActive
                        ? "text-slate-400"
                        : "text-slate-900"
                    }`}
                  >
                    {idx + 1}. {meta.label}
                  </span>
                  {statusBadge(stage.status as StageStatus, isActive)}
                  {isLaunched && version && (
                    <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-green-600 text-white">
                      Live — {version}
                    </span>
                  )}
                </div>

                {!compact && (
                  <p
                    className={`text-xs leading-relaxed ${
                      stage.status === "not_started" && !isActive
                        ? "text-slate-400"
                        : "text-slate-600"
                    }`}
                  >
                    {isActive ? meta.nextStep : meta.description}
                  </p>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
