import MuiTable from "../table";
import Image from "next/image";
import InvoiceStatus from "./status";
import { formatDateToLocal, formatCurrency } from "@/app/lib/utils";
import { fetchFilteredInvoices } from "@/app/lib/data";
import { UpdateInvoice, DeleteInvoice } from "./buttons";

type TableProps = {
  query: string;
  currentPage: number;
  status: string;
};

const InvoiceTable = async ({ query, status, currentPage }: TableProps) => {
  const invoices = await fetchFilteredInvoices(
    query,
    currentPage,
    status.toLowerCase()
  );

  const bodyData = invoices.map((invoice) => ({
    customer: (
      <div className="flex items-center gap-3">
        <Image
          src={invoice.image_url}
          className="rounded-full"
          width={28}
          height={28}
          alt={`${invoice.name}'s profile picture`}
        />
        <p>{invoice.name}</p>
      </div>
    ),
    email: (
      <p className="text-gray-500 text-sm md:text-gray-900 my-2 md:my-0">
        {invoice.email}
      </p>
    ),
    amount: <p className="my-1 md:my-0">{formatCurrency(invoice.amount)}</p>,
    date: <p className="hidden md:block">{formatDateToLocal(invoice.date)}</p>,
    status: (
      <div className="my-1 md:my-0">
        <InvoiceStatus status={invoice.status} />
      </div>
    ),
    actions: (
      <div className="flex justify-end gap-3 mt-[-40px] md:mt-0">
        <UpdateInvoice id={invoice.id} />
        <DeleteInvoice id={invoice.id} />
      </div>
    ),
  }));

  return (
    <MuiTable
      headCells={[
        { label: "Customer", show: true },
        { label: "Email", show: true },
        { label: "Amount", show: true },
        { label: "Date", show: true },
        { label: "Status", show: true },
        { label: "Actions", show: false },
      ]}
      body={bodyData}
    />
  );
};

export default InvoiceTable;
