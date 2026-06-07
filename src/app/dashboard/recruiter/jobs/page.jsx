import { getCompanyJobs } from "@/lib/api/jobs";
import RecruiterJobsTableClient from "./RecruiterJobsTableClient";
import { getLoggedInRecruiterCompany } from "@/lib/api/companies";

const RecruiterJobs = async () => {
  const company = await getLoggedInRecruiterCompany();
  console.log("This is the", company);

  const jobs = (await getCompanyJobs(company?._id)) || [];

  return (
    <div className="p-6">
      <RecruiterJobsTableClient jobs={jobs} />
    </div>
  );
};

export default RecruiterJobs;
