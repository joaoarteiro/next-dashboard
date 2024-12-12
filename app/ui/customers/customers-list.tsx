import { fetchFilteredCustomers } from "@/app/lib/data";
import clsx from "clsx";
import Image from "next/image";
import { lusitana } from "@/app/ui/fonts";
import { DeleteCustomer } from "./buttons";

type CustomersListProps = {
  query: string;
  currentPage: number;
};

const CustomersList = async ({ query, currentPage }: CustomersListProps) => {
  const customers = await fetchFilteredCustomers(query, currentPage);
  return (
    <div className="flex w-full flex-col md:col-span-4 mt-6">
      <div className="flex grow flex-col justify-between rounded-xl bg-gray-50 p-4">
        <div className="bg-white px-6">
          {customers.map((customer, i) => {
            return (
              <div
                key={customer.id}
                className={clsx(
                  "flex flex-row items-center justify-between py-3",
                  {
                    "border-t": i !== 0,
                  }
                )}
              >
                <div className="flex items-center">
                  <Image
                    src={
                      customer.image_url
                        ? customer.image_url
                        : "/customers/default.png"
                    }
                    alt={`${customer.name}'s profile picture`}
                    className="mr-4 rounded-full"
                    width={32}
                    height={32}
                  />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold md:text-base">
                      {customer.name}
                    </p>
                    <p className="hidden text-sm text-gray-500 sm:block">
                      {customer.email}
                    </p>
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <DeleteCustomer id={customer.id} />
                </div>
              </div>
            );
          })}
        </div>
        {/* <div className="flex items-center pb-2 pt-6">
          <ArrowPathIcon className="h-5 w-5 text-gray-500" />
          <h3 className="ml-2 text-sm text-gray-500 ">Updated just now</h3>
        </div> */}
      </div>
    </div>
  );
};

export default CustomersList;
