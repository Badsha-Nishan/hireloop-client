"use client";
import OverviewPage from "@/components/dashboard/OverviewPage";
import { useSession } from "@/lib/auth-client";
import { FileText, Persons, Thunderbolt, CircleCheck } from "@gravity-ui/icons";

const RecruiterDashboardHomePage = () => {
  const { data: session, isPending } = useSession();

  // BUG FIX: Added 'return' statement here
  if (isPending) {
    return <p>Loading...</p>;
  }

  const user = session?.user;

  const liveMetricsData = [
    {
      title: "Total Job Posts",
      value: "48",
      icon: FileText,
    },
    {
      title: "Total Applicants",
      value: "1,284",
      icon: Persons,
    },
    {
      title: "Active Jobs",
      value: "18",
      icon: Thunderbolt,
    },
    {
      title: "Jobs Closed",
      value: "32",
      icon: CircleCheck,
    },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold">Welcome Back, {user?.name}</h2>
      {/* Passing the dynamic array down as a prop */}
      <OverviewPage stats={liveMetricsData} />
    </div>
  );
};

export default RecruiterDashboardHomePage;
