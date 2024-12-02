import Breadcrumbs from "@/app/ui/invoices/breadcrumbs";

const Page = () => {
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Customers", href: "/dashboard/customers" },
          {
            label: "Create Customer",
            href: "/dashboard/customers/create",
            active: true,
          },
        ]}
      />
      my form
    </main>
  );
};

export default Page;
