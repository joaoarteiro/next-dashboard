import { fetchCardData } from "@/app/lib/data";
import { lusitana } from "../fonts";
import { ChartConfiguration } from "chart.js";

const PieChart = async () => {
  const { totalPaidInvoices, totalPendingInvoices } = await fetchCardData();
  const totalPaidValue = parseFloat(totalPaidInvoices.replace(/[$,]/g, ""));
  const totalPendingValue = parseFloat(
    totalPendingInvoices.replace(/[$,]/g, "")
  );
  const data = {
    labels: ["Paid", "Pending"],
    values: [totalPaidValue, totalPendingValue],
  };
  const configuration: ChartConfiguration<"pie", number[], unknown> = {
    type: "pie" as const,
    data: {
      labels: data.labels,
      datasets: [
        {
          label: "Number of Invoices",
          data: data.values,
          backgroundColor: ["rgba(2, 178, 175, 1)", "rgba(46, 150, 255, 1)"],
        },
      ],
    },
    options: {
      responsive: true,
      scales: {
        y: {
          display: false,
        },
      },
    },
  };

  return (
    <div className="w-full md:col-span-4 ">
      <h2 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Pie Chart - Server Side Rendering
      </h2>
      <div className="rounded-xl bg-gray-50 p-4">
        <div className="flex items-center justify-center bg-white py-4 h-60">
          <img
            src={`/api/chart?configuration=${encodeURIComponent(
              JSON.stringify(configuration)
            )}`}
            alt="Generated Pie Chart"
          />
        </div>
      </div>
    </div>
  );
};

export default PieChart;
