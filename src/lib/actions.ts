"use server";

import { z } from "zod";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100, "Name is too long"),
  email: z.string().trim().email("Enter a valid email address").max(254, "Email is too long"),
  company: z.string().trim().max(160, "Company name is too long").optional(),
  message: z
    .string()
    .trim()
    .min(10, "Tell us a bit more (10 characters minimum)")
    .max(4000, "Message is too long"),
});

type ContactField = "name" | "email" | "company" | "message";

export interface ContactFormState {
  status: "idle" | "success" | "error";
  errors?: Partial<Record<ContactField, string>>;
  formError?: string;
}

export async function submitContactForm(
  _prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const parsed = contactSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    company: formData.get("company") || undefined,
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

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RADHA_CONTACT_FROM_EMAIL;
  const to = process.env.RADHA_CONTACT_TO_EMAIL ?? "hello@radha.app";

  if (!apiKey || !from) {
    return {
      status: "error",
      formError: "Online delivery is not configured yet. Please email hello@radha.app directly.",
    };
  }

  const { name, email, company, message } = parsed.data;
  const text = [
    "New RADHA AI website inquiry",
    "",
    `Name: ${name}`,
    `Email: ${email}`,
    `Company: ${company || "Not provided"}`,
    "",
    message,
  ].join("\n");

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: email,
        subject: `RADHA AI inquiry from ${name}`,
        text,
      }),
      cache: "no-store",
    });

    if (!response.ok) {
      return {
        status: "error",
        formError: "We could not send your inquiry right now. Please email hello@radha.app directly.",
      };
    }
  } catch {
    return {
      status: "error",
      formError: "We could not send your inquiry right now. Please email hello@radha.app directly.",
    };
  }

  return { status: "success" };
}
