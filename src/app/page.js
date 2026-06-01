import Banner from "@/components/Banner";
import JobCTA from "@/components/JobCTA";
import JobDiscovery from "@/components/JobDiscovery";
import JobFeatures from "@/components/JobFeatures";
import JobPricing from "@/components/JobPricing";
import StatsSection from "@/components/StatsSection";

export default function Home() {
  return (
    <div className="">
      <Banner />
      <StatsSection />
      <JobDiscovery />
      <JobFeatures />
      <JobPricing />
      <JobCTA />
    </div>
  );
}
