import { getJobById } from "@/lib/api/jobs";
import { getUserSession } from "@/lib/core/session";
import { redirect } from "next/navigation";
import JobApply from "./JobApply";
import { getApplicationsByApplicant } from "@/lib/api/applications";
import Link from "next/link";

const ApplyPage = async ({ params }) => {
  const { id } = await params;

  const user = await getUserSession();
  if (!user) {
    redirect(`/auth/signin?redirect=/jobs/${id}/apply`);
  }

  // Styled unauthorized/wrong role state
  if (user.role !== "seeker") {
    return (
      <div className="max-w-xl mx-auto mt-12 p-6 bg-red-50 border border-red-200 rounded-xl text-center">
        <h2 className="text-xl font-bold text-red-700 mb-2">Access Denied</h2>
        <p className="text-red-600">
          Only job seekers can apply for this position.
        </p>
        <Link
          href="/jobs"
          className="inline-block mt-4 text-sm font-semibold text-red-700 hover:underline"
        >
          ← Back to Job Listings
        </Link>
      </div>
    );
  }

  const applications = await getApplicationsByApplicant(user.id);
  const plan = {
    name: "Free",
    maxApplicationPerMonth: 3,
  };

  const job = await getJobById(id);
  const hasRemainingApplications =
    applications.length < plan.maxApplicationPerMonth;

  return (
    <div className="min-h-screen bg-neutral-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-xl mx-auto space-y-6">
        {/* Application Limit Tracker Card */}
        <div
          className={`p-5 rounded-xl border transition-all ${
            hasRemainingApplications
              ? "bg-white border-neutral-200 shadow-sm"
              : "bg-amber-50 border-amber-200"
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-neutral-500 uppercase tracking-wider">
              {plan.name} Plan Usage
            </span>
            <span
              className={`text-sm font-bold ${
                hasRemainingApplications ? "text-neutral-900" : "text-amber-700"
              }`}
            >
              {applications.length} / {plan.maxApplicationPerMonth} applied
            </span>
          </div>

          {/* Simple Dynamic Progress Bar */}
          <div className="w-full bg-neutral-100 h-2 rounded-full overflow-hidden mb-4">
            <div
              className={`h-full transition-all duration-300 ${
                hasRemainingApplications ? "bg-blue-600" : "bg-amber-500"
              }`}
              style={{
                width: `${Math.min(
                  (applications.length / plan.maxApplicationPerMonth) * 100,
                  100
                )}%`,
              }}
            />
          </div>

          {/* Call to action text */}
          <div className="text-sm text-neutral-600">
            {hasRemainingApplications ? (
              <p>
                You can apply for{" "}
                {plan.maxApplicationPerMonth - applications.length} more
                positions this month.{" "}
                <Link
                  href="/plans"
                  className="text-blue-600 font-medium hover:underline inline-flex items-center gap-0.5"
                >
                  View plans to upgrade
                </Link>
              </p>
            ) : (
              <div className="space-y-2">
                <p className="font-semibold text-amber-900">
                  You've hit your monthly application limit!
                </p>
                <p className="text-amber-800">
                  Purchase a premium plan to continue applying for positions
                  immediately.{" "}
                  <Link
                    href="/plans"
                    className="underline font-bold hover:text-amber-950"
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
