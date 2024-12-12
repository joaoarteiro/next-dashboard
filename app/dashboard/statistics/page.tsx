import LatestInvoices from "@/app/ui/dashboard/latest-invoices";
import StatisticsBarChart from "@/app/ui/statistics/bar-chart";
import PieGraph from "@/app/ui/dashboard/pie-chart";
import PieChart from "@/app/ui/statistics/pie-chart";
import ApexChart from "@/app/ui/statistics/apex-chart";
import { lusitana } from "@/app/ui/fonts";
import { Suspense } from "react";
import {
  LatestInvoicesSkeleton,
  RevenueChartSkeleton,
  PieGraphSkeleton,
  PieChartSkeletonServerSide,
} from "../../ui/skeletons";

const Page = async () => {
  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Statistics
      </h1>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        <Suspense fallback={<RevenueChartSkeleton />}>
          <StatisticsBarChart />
        </Suspense>

        <Suspense fallback={<LatestInvoicesSkeleton />}>
          <ApexChart />
        </Suspense>
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        <Suspense fallback={<PieGraphSkeleton />}>
          <PieGraph />
        </Suspense>
        <Suspense fallback={<PieChartSkeletonServerSide />}>
          <PieChart />
        </Suspense>
      </div>
    </main>
  );
};

export default Page;
