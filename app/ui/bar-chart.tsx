"use client";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { lusitana } from "@/app/ui/fonts";
import { ReactNode } from "react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

type BarChartProps = {
  data: ChartData<"bar">;
  options: ChartOptions<"bar">;
  title: string;
  footer?: ReactNode;
};

const BarChart = ({ data, options, title, footer }: BarChartProps) => {
  return (
    <div className="w-full md:col-span-4">
      <h2 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        {title}
      </h2>
      <div className="rounded-xl bg-gray-50 p-4">
        <div className="sm:grid-cols-13 mt-0 grid grid-cols-12 items-end gap-2 rounded-md bg-white p-4 md:gap-4">
          <Bar options={options} data={data} />
        </div>
        {footer && footer}
      </div>
    </div>
  );
};

export default BarChart;
