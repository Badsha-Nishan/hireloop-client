import { getJobById } from "@/lib/api/jobs";
import { getUserSession } from "@/lib/core/session";
import { redirect } from "next/navigation";
import JobApply from "./JobApply";

const ApplyPage = async ({ params }) => {
  const { id } = await params;

  const user = await getUserSession();
  if (!user) {
    redirect(`/auth/signin?redirect=/jobs/${id}/apply`);
  }

  if (user.role !== "seeker") {
    return (
      <h2 className="text-2xl text-red-500">
        Only job seekers can apply this position.
      </h2>
    );
  }

  const job = await getJobById(id);

  return (
    <div>
      <div>Apply for this {job.title}</div>
      <JobApply job={job} applicant={user} />
    </div>
  );
};

export default ApplyPage;
