import { getJobById } from "@/lib/api/jobs";
import { getUserSession } from "@/lib/core/session";
import { redirect } from "next/navigation";
import JobApply from "./JobApply";
import { getApplicationsByApplicant } from "@/lib/api/applications";
import Link from "next/link";
import { getPlanById } from "@/lib/api/plans";

const ApplyPage = async ({ params }) => {
  const { id } = await params;

  const user = await getUserSession();
  if (!user) {
    redirect(`/auth/signin?redirect=/jobs/${id}/apply`);
  }

  // Styled unauthorized/wrong role state
  if (user.role !== "seeker") {
    return (
      <div className="max-w-xl mx-auto mt-12 p-6 bg-red-950/40 border border-red-900 rounded-xl text-center">
        <h2 className="text-xl font-bold text-red-400 mb-2">Access Denied</h2>
        <p className="text-red-300">
          Only job seekers can apply for this position.
        </p>
        <Link
          href="/jobs"
          className="inline-block mt-4 text-sm font-semibold text-red-400 hover:underline"
        >
          ← Back to Job Listings
        </Link>
      </div>
    );
  }

  const applications = await getApplicationsByApplicant(user.id);
  const plan = await getPlanById(user?.plan || "seeker_free");

  // Fix: Check if plan allows unlimited (-1), otherwise validate current total against max limits
  const isUnlimited = plan.maxApplicationsPerMonth === -1;
  const hasRemainingApplications =
    isUnlimited || applications.length < plan.maxApplicationsPerMonth;

  const job = await getJobById(id);

  return (
    <div className="min-h-screen bg-slate-950 py-12 px-4 sm:px-6 lg:px-8 text-slate-100">
      <div className="max-w-xl mx-auto space-y-6">
        {/* Application Limit Tracker Card */}
        <div
          className={`p-5 rounded-xl border transition-all ${
            hasRemainingApplications
              ? "bg-slate-900 border-slate-800 shadow-sm"
              : "bg-amber-950/40 border-amber-900/60"
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-slate-400 uppercase tracking-wider">
              {plan.name} Plan Usage
            </span>
            <span
              className={`text-sm font-bold ${
                hasRemainingApplications ? "text-slate-100" : "text-amber-400"
              }`}
            >
              {applications.length} /{" "}
              {isUnlimited ? "∞" : plan.maxApplicationsPerMonth} applied
            </span>
          </div>

          {/* Simple Dynamic Progress Bar */}
          <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden mb-4 border border-slate-800">
            <div
              className={`h-full transition-all duration-300 ${
                hasRemainingApplications ? "bg-blue-600" : "bg-amber-500"
              }`}
              style={{
                width: isUnlimited
                  ? "0%"
                  : `${Math.min(
                      (applications.length / plan.maxApplicationsPerMonth) *
                        100,
                      100
                    )}%`,
              }}
            />
          </div>

          {/* Call to action text */}
          <div className="text-sm text-slate-300">
            {hasRemainingApplications ? (
              <p>
                {isUnlimited ? (
                  <span>
                    You have unlimited applications available this month.{" "}
                  </span>
                ) : (
                  <span>
                    You can apply for{" "}
                    <strong className="text-white">
                      {plan.maxApplicationsPerMonth - applications.length}
                    </strong>{" "}
                    more positions this month.{" "}
                  </span>
                )}
                <Link
                  href="/pricing"
                  className="text-blue-400 font-medium hover:underline inline-flex items-center gap-0.5"
                >
                  View plans
                </Link>
              </p>
            ) : (
              <div className="space-y-2">
                <p className="font-semibold text-amber-400">
                  You've hit your monthly application limit!
                </p>
                <p className="text-amber-300/90">
                  Purchase a premium plan to continue applying for positions
                  immediately.{" "}
                  <Link
                    href="/plans"
                    className="underline font-bold text-amber-400 hover:text-amber-300"
                  >
                    View Upgrade Options →
                  </Link>
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Job Apply Form Container */}
        {hasRemainingApplications && (
          <div className="animate-in fade-in slide-in-from-bottom-3 duration-300">
            <JobApply job={job} applicant={user} />
          </div>
        )}
      </div>
    </div>
  );
};

export default ApplyPage;
