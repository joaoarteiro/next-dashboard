"use client";

import { ApexOptions } from "apexcharts";
import { lusitana } from "@/app/ui/fonts";
import dynamic from "next/dynamic";

// Dynamically import ApexCharts with SSR disabled for Next.js compatibility
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

type BarChartProps = {
  title: string;
  options: ApexOptions;
  series: Array<{ data: number[]; name: string }>;
  height: string;
};

const ApexBarChart = ({ title, options, series, height }: BarChartProps) => {
  return (
    <div className="w-full md:col-span-4">
      <h2 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        {title}
      </h2>

      <div className="rounded-xl bg-gray-50 p-4">
        <div className="bg-white">
          <Chart options={options} series={series} type="bar" height={height} />
        </div>
      </div>
    </div>
  );
};

export default ApexBarChart;
