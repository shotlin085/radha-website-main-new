"use server";

import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Enter a valid email address"),
  company: z.string().optional(),
  message: z.string().min(10, "Tell us a bit more (10 characters minimum)"),
});

type ContactField = "name" | "email" | "company" | "message";

export interface ContactFormState {
  status: "idle" | "success" | "error";
  errors?: Partial<Record<ContactField, string>>;
}

// Backend is intentionally a stub — no email/CRM provider has been chosen
// yet. Swapping in real delivery only requires changing this function.
export async function submitContactForm(
  _prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const parsed = contactSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    company: formData.get("company"),
    message: formData.get("message"),
  });

  if (!parsed.success) {
    const errors: Partial<Record<ContactField, string>> = {};
    for (const issue of parsed.error.issues) {
      const field = issue.path[0] as ContactField;
      if (!errors[field]) errors[field] = issue.message;
    }
    return { status: "error", errors };
  }

  console.info("New RADHA demo request received:", parsed.data);

  return { status: "success" };
}
