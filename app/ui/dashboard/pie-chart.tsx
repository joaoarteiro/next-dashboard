import { fetchCardData } from "@/app/lib/data";
import * as React from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import { lusitana } from "@/app/ui/fonts";

const PieGraph = async () => {
  const { totalPaidInvoices, totalPendingInvoices } = await fetchCardData();

  // Convert string with $ to a number
  const totalPaidValue = parseFloat(totalPaidInvoices.replace(/[$,]/g, ""));
  const totalPendingValue = parseFloat(
    totalPendingInvoices.replace(/[$,]/g, "")
  );

  return (
    <div className="w-full md:col-span-4">
      <h2 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Pie Chart
      </h2>

      <div className="rounded-xl bg-gray-50 p-4">
        <div className="flex items-center justify-center bg-white py-4">
          <PieChart
            series={[
              {
                data: [
                  { id: 0, value: totalPaidValue, label: "Paid" },
                  { id: 1, value: totalPendingValue, label: "Pending" },
                ],
              },
            ]}
            width={400}
            height={200}
          />
        </div>
      </div>
    </div>
  );
};

export default PieGraph;
