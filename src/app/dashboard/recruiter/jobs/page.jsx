import { getCompanyJobs } from "@/lib/api/jobs";
import RecruiterJobsTableClient from "./RecruiterJobsTableClient";

const RecruiterJobs = async () => {
  const companyId = "company_123";

  const jobs = await getCompanyJobs(companyId);

  return (
    <div className="p-6">
      <RecruiterJobsTableClient jobs={jobs} />
    </div>
  );
};

export default RecruiterJobs;
