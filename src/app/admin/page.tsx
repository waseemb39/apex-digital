import { createClient } from "@/lib/supabase/server";
import CreateCustomerForm from "@/components/CreateCustomerForm";
import Link from "next/link";
import type { CustomerRow } from "@/lib/types";

const STAGE_LABELS: Record<string, string> = {
  onboarding: "Onboarding",
  content: "Content",
  design: "Design",
  development: "Development",
  qa: "QA",
  devops: "DevOps",
  launched: "Launched",
};

const STATUS_BADGE: Record<
  string,
  { label: string; cls: string }
> = {
  not_started:       { label: "Not started",       cls: "bg-slate-100 text-slate-500" },
  in_progress:       { label: "In progress",       cls: "bg-blue-100 text-blue-700" },
  awaiting_approval: { label: "Awaiting approval", cls: "bg-amber-100 text-amber-700" },
  approved:          { label: "Approved",           cls: "bg-green-100 text-green-700" },
  complete:          { label: "Complete",           cls: "bg-green-100 text-green-800" },
};

export default async function AdminDashboard() {
  const supabase = await createClient();

  const { data: customers } = await supabase
    .from("profiles")
    .select(`
      id, full_name, business_name, email, phone, created_at,
      projects (
        id, name, current_stage, updated_at,
        project_stages ( stage_key, position, status )
      )
    `)
    .eq("role", "customer")
    .order("created_at", { ascending: false })
    .returns<CustomerRow[]>();

  const list = customers ?? [];
  const totalProjects = list.reduce((n, c) => n + c.projects.length, 0);

  return (
    <div className="space-y-8">
      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900">Customers</h1>
          <p className="text-slate-500 text-sm mt-1">
            {list.length} customer{list.length !== 1 ? "s" : ""} ·{" "}
            {totalProjects} project{totalProjects !== 1 ? "s" : ""}
          </p>
        </div>
        <CreateCustomerForm />
      </div>

      {/* Customer table */}
      {list.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-xl p-12 text-center">
          <p className="text-slate-400 text-sm">
            No customers yet. Use the button above to create the first one.
          </p>
        </div>
      ) : (
        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
          {/* Desktop table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  <th className="px-5 py-3">Business</th>
                  <th className="px-5 py-3">Contact</th>
                  <th className="px-5 py-3">Project</th>
                  <th className="px-5 py-3">Stage</th>
                  <th className="px-5 py-3">Status</th>
                  <th className="px-5 py-3" />
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {list.map((customer) => {
                  const project = customer.projects[0];
                  const currentStageRow = project?.project_stages?.find(
                    (s) => s.stage_key === project.current_stage
                  );

                  return (
                    <tr
                      key={customer.id}
                      className="hover:bg-slate-50 transition-colors"
                    >
                      <td className="px-5 py-4 font-semibold text-slate-900">
                        {customer.business_name ?? "—"}
                      </td>
                      <td className="px-5 py-4">
                        <p className="text-slate-800">{customer.full_name ?? "—"}</p>
                        <p className="text-slate-400 text-xs">{customer.email}</p>
                      </td>
                      <td className="px-5 py-4 text-slate-600">
                        {project ? project.name : <span className="text-slate-400">No project</span>}
                      </td>
                      <td className="px-5 py-4 text-slate-700">
                        {project
                          ? STAGE_LABELS[project.current_stage] ?? project.current_stage
                          : "—"}
                      </td>
                      <td className="px-5 py-4">
                        {currentStageRow ? (
                          <span
                            className={`inline-flex px-2 py-0.5 rounded-full text-xs font-semibold ${
                              STATUS_BADGE[currentStageRow.status]?.cls ??
                              "bg-slate-100 text-slate-500"
                            }`}
                          >
                            {STATUS_BADGE[currentStageRow.status]?.label ??
                              currentStageRow.status}
                          </span>
                        ) : (
                          "—"
                        )}
                      </td>
                      <td className="px-5 py-4 text-right">
                        <Link
                          href={`/admin/customers/${customer.id}`}
                          className="text-green-600 hover:text-green-700 font-semibold text-xs"
                        >
                          View →
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="md:hidden divide-y divide-slate-100">
            {list.map((customer) => {
              const project = customer.projects[0];
              const currentStageRow = project?.project_stages?.find(
                (s) => s.stage_key === project.current_stage
              );

              return (
                <Link
                  key={customer.id}
                  href={`/admin/customers/${customer.id}`}
                  className="block px-4 py-4 hover:bg-slate-50 transition-colors"
                >
                  <p className="font-bold text-slate-900 text-sm">
                    {customer.business_name ?? customer.full_name ?? "Unknown"}
                  </p>
                  <p className="text-slate-500 text-xs mt-0.5">{customer.email}</p>
                  {project && (
                    <div className="mt-2 flex items-center gap-2">
                      <span className="text-xs text-slate-600">{project.name}</span>
                      <span className="text-slate-300">·</span>
                      <span className="text-xs text-slate-600">
                        {STAGE_LABELS[project.current_stage]}
                      </span>
                      {currentStageRow && (
                        <span
                          className={`inline-flex px-2 py-0.5 rounded-full text-xs font-semibold ${
                            STATUS_BADGE[currentStageRow.status]?.cls
                          }`}
                        >
                          {STATUS_BADGE[currentStageRow.status]?.label}
                        </span>
                      )}
                    </div>
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
