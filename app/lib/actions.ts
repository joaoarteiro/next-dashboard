"use server";

import { z } from "zod";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const InvoiceFormSchema = z.object({
  id: z.string(),
  customerId: z.string({
    invalid_type_error: "Please select a customer.",
  }),
  amount: z.coerce
    .number()
    .gt(0, { message: "Please enter an amount greater than $0." }),
  status: z.enum(["pending", "paid"], {
    invalid_type_error: "Please select an invoice status.",
  }),
  date: z.string(),
});

const CustomerFormSchema = z.object({
  id: z.string(),
  name: z.string({
    invalid_type_error: "Please enter a name.",
  }),
  email: z.string({
    invalid_type_error: "Please enter an email.",
  }),
  image: z.string({
    invalid_type_error: "Please select an image.",
  }),
});

export type State = {
  errors?: {
    customerId?: string[];
    amount?: string[];
    status?: string[];
  };
  message?: string | null;
};

const CreateInvoice = InvoiceFormSchema.omit({ id: true, date: true });
const UpdateInvoice = InvoiceFormSchema.omit({ id: true, date: true });
const CreateCustomer = CustomerFormSchema.omit({ id: true });

export const createInvoice = async (prevState: State, formData: FormData) => {
  // Validate form using Zod
  const validatedFields = CreateInvoice.safeParse({
    customerId: formData.get("customerId"),
    amount: formData.get("amount"),
    status: formData.get("status"),
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create Invoice.",
    };
  }

  // Prepare data for insertion into the database
  const { customerId, amount, status } = validatedFields.data;

  // It's usually good practice to store monetary values in cents in your database
  // to eliminate JavaScript floating-point errors and ensure greater accuracy.
  const amountInCents = amount * 100;
  const date = new Date().toISOString().split("T")[0];

  try {
    await sql`
  INSERT INTO invoices (customer_id, amount, status, date)
  VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
`;
  } catch (error) {
    return {
      message: "Database Error: Failed to Create Invoice.",
    };
  }
  /*Next.js has a Client-side Router Cache that stores the route segments in the user's browser for a time.
  Along with prefetching, this cache ensures that users can quickly navigate between routes while reducing the number of requests made to the server.
  Since you're updating the data displayed in the invoices route, you want to clear this cache and trigger a new request to the server.
  You can do this with the revalidatePath function from Next.js: */
  revalidatePath("/dashboard/invoices");

  //redirect the user back to the /dashboard/invoices page
  redirect("/dashboard/invoices");
};

export const updateInvoice = async (id: string, formData: FormData) => {
  const { customerId, amount, status } = UpdateInvoice.parse({
    customerId: formData.get("customerId"),
    amount: formData.get("amount"),
    status: formData.get("status"),
  });

  const amountInCents = amount * 100;

  try {
    await sql`
    UPDATE invoices
    SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
    WHERE id = ${id}
  `;
  } catch (error) {
    return {
      message: "Database Error: Failed to Update Invoice",
    };
  }
  revalidatePath("/dashboard/invoices");
  redirect("/dashboard/invoices");
};

export const deleteInvoice = async (id: string) => {
  try {
    await sql`DELETE FROM invoices WHERE id = ${id}`;
    revalidatePath("/dashboard/invoices");
    return { message: "Deleted Invoice." };
  } catch (error) {
    return { message: "Database Error: Failed to Delete Invoice" };
  }
};

export const createCustomer = async (formData: FormData) => {
  // Validate form using Zod
  const validatedFields = CreateCustomer.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    image: formData.get("image"),
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create Invoice.",
    };
  }

  const { name, email, image } = validatedFields.data;

  try {
    await sql`
  INSERT INTO customers (name, email, image_url)
  VALUES (${name}, ${email}, ${image})
`;
  } catch (error) {
    return {
      message: "Database Error: Failed to Create Customer.",
    };
  }

  revalidatePath("/dashboard/customers");
  redirect("/dashboard/customers");
};

export const deleteCustomer = async (id: string) => {
  try {
    await sql`DELETE FROM customers WHERE id = ${id}`;
    revalidatePath("/dashboard/customers");
    return { message: "Deleted Customer." };
  } catch (error) {
    return { message: "Database Error: Failed to Delete Customer" };
  }
};
