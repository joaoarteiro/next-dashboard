import Pagination from "@/app/ui/invoices/pagination";
import Search from "@/app/ui/search";
import MuiTable from "@/app/ui/invoices/invoicesTable";
import { fetchInvoicesPages } from "@/app/lib/data";
import { CreateInvoice } from "@/app/ui/invoices/buttons";
import { lusitana } from "@/app/ui/fonts";
import { InvoicesTableSkeleton } from "@/app/ui/skeletons";
import { Suspense } from "react";
import Selector from "@/app/ui/selector";

const Page = async (props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
    status?: string;
  }>;
}) => {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || "";
  const status = searchParams?.status || "";
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await fetchInvoicesPages(query, status);

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Resources</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search invoices..." />
        <Selector
          label="Status"
          options={["All", "Paid", "Pending"]}
          defaultOption="All"
        />
        <CreateInvoice />
      </div>
      <Suspense
        key={query + currentPage + status}
        fallback={<InvoicesTableSkeleton />}
      >
        <MuiTable query={query} status={status} currentPage={currentPage} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
};

export default Page;
