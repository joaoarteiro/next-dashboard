import { fetchCustomerInvoices } from "@/app/lib/data";
import ApexBarChart from "../apex-bar-chart";
import { ApexOptions } from "apexcharts";

// A bar chart that displays the top 6 customers with most invoices
const ApexChart = async () => {
  const customers = await fetchCustomerInvoices();

  const customerNames: string[] = [];
  const customerTotalInvoices: number[] = [];

  customers.forEach(({ name, total_invoices }) => {
    customerNames.push(name);
    customerTotalInvoices.push(total_invoices);
  });

  const options: ApexOptions = {
    chart: {
      type: "bar",
      height: 442,
    },
    plotOptions: {
      bar: {
        borderRadius: 4,
        borderRadiusApplication: "end",
        horizontal: true,
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: customerNames,
    },
  };

  const series = [
    {
      data: customerTotalInvoices,
      name: "Total Invoices",
    },
  ];

  return (
    <ApexBarChart
      title="Most Invoices"
      options={options}
      series={series}
      height="442"
    />
  );
};

export default ApexChart;
