import BarChart from "../bar-chart";
import { fetchRevenue } from "@/app/lib/data";
import { CalendarIcon } from "@heroicons/react/24/outline";

const StatisticsBarChart = async () => {
  const revenue = await fetchRevenue();

  const data = {
    labels: revenue.map((month) => month.month),
    datasets: [
      {
        label: "Monthly Revenue",
        data: revenue.map((revenue) => revenue.revenue),
        backgroundColor: revenue.map(() => "rgb(147 197 253)"),
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: "rgb(156 163 175)",
          font: {
            size: 15,
          },
        },
      },
      y: {
        grid: {
          display: false,
        },
        ticks: {
          color: "rgb(156 163 175)",
          font: {
            size: 15,
          },
        },
      },
    },
    elements: {
      bar: {
        borderRadius: 8,
      },
    },
  };

  const footer = (
    <div className="flex items-center pb-2 pt-6">
      <CalendarIcon className="h-5 w-5 text-gray-500" />
      <h3 className="ml-2 text-sm text-gray-500 ">Last 12 months</h3>
    </div>
  );

  return (
    <BarChart
      options={options}
      data={data}
      title="Recent Revenue"
      footer={footer}
    />
  );
};

export default StatisticsBarChart;
