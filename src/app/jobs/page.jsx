// @/app/jobs/page.js (or your respective page route path)
import { getJobs } from "@/lib/api/jobs";
import JobContainer from "@/components/jobs/JobContainer";

export default async function JobsPage() {
  const jobs = await getJobs();

  return (
    <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Open Positions
        </h1>
        <p className="text-default-500 mt-2">
          Explore the latest career opportunities.
        </p>
      </div>

      {/* Client Container handling interactive filtering and mapping */}
      <JobContainer initialJobs={jobs} />
    </main>
  );
}
