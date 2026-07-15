"use client";

import { useActionState, useEffect, useRef } from "react";
import { useFormStatus } from "react-dom";
import { CheckCircle2 } from "lucide-react";
import { submitContactForm, type ContactFormState } from "@/lib/actions";
import { Button } from "@/components/ui/Button";

const initialState: ContactFormState = { status: "idle" };

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-1.5 text-sm text-danger">
      {message}
    </p>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full tablet:w-auto">
      {pending ? "Sending..." : "Send inquiry"}
    </Button>
  );
}

const fieldClassName =
  "w-full rounded-xl border border-black/14 bg-[#f7f7f5] px-4 py-3.5 text-ink placeholder:text-black/60 focus:border-[#9a6818] focus-visible:outline-2 focus-visible:outline-offset-2";

export function ContactForm() {
  const [state, formAction] = useActionState(submitContactForm, initialState);
  const errorSummaryRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.status === "error") errorSummaryRef.current?.focus();
    if (state.status === "success") formRef.current?.reset();
  }, [state]);

  const errors = state.status === "error" ? state.errors : undefined;
  const formError = state.status === "error" ? state.formError : undefined;

  if (state.status === "success") {
    return (
      <div role="status" className="py-8 text-center">
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#e8e1d1] text-[#79520f]">
          <CheckCircle2 size={26} aria-hidden="true" />
        </span>
        <h2 className="mt-6 text-2xl font-semibold text-ink">Inquiry received</h2>
        <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-ink-muted">
          Thank you. The RADHA AI team will review your message and follow up with the right product path.
        </p>
      </div>
    );
  }

  return (
    <form ref={formRef} action={formAction} noValidate className="flex flex-col gap-5">
      {errors || formError ? (
        <div
          ref={errorSummaryRef}
          tabIndex={-1}
          role="alert"
          aria-live="assertive"
          className="rounded-xl border border-danger/30 bg-danger/10 p-4 text-sm text-danger"
        >
          {formError ?? "Please fix the highlighted fields below."}
        </div>
      ) : null}

      <div className="grid gap-5 tablet:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-ink">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            placeholder="Your name"
            aria-invalid={Boolean(errors?.name)}
            aria-describedby={errors?.name ? "name-error" : undefined}
            className={fieldClassName}
          />
          <FieldError id="name-error" message={errors?.name} />
        </div>

        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-ink">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@company.com"
            aria-invalid={Boolean(errors?.email)}
            aria-describedby={errors?.email ? "email-error" : undefined}
            className={fieldClassName}
          />
          <FieldError id="email-error" message={errors?.email} />
        </div>
      </div>

      <div>
        <label htmlFor="company" className="mb-1.5 block text-sm font-medium text-ink">
          Company <span className="text-ink-muted">(optional)</span>
        </label>
        <input
          id="company"
          name="company"
          type="text"
          autoComplete="organization"
          placeholder="Company or organization"
          className={fieldClassName}
        />
      </div>

      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-ink">
          What would you like to explore?
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          placeholder="Beta access, a business pilot, research, or a partnership..."
          aria-invalid={Boolean(errors?.message)}
          aria-describedby={errors?.message ? "message-error" : undefined}
          className={fieldClassName}
        />
        <FieldError id="message-error" message={errors?.message} />
      </div>

      <div className="flex flex-col gap-4 tablet:flex-row tablet:items-center tablet:justify-between">
        <p className="max-w-sm text-xs leading-5 text-ink-muted">
          By submitting, you agree that RADHA AI may contact you about this inquiry.
        </p>
        <SubmitButton />
      </div>
    </form>
  );
}
