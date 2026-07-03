"use client";

import { useActionState, useEffect, useRef } from "react";
import { useFormStatus } from "react-dom";
import Image from "next/image";
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
      {pending ? "Sending…" : "Request a demo"}
    </Button>
  );
}

export function ContactForm() {
  const [state, formAction] = useActionState(submitContactForm, initialState);
  const errorSummaryRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.status === "error") {
      errorSummaryRef.current?.focus();
    } else if (state.status === "success") {
      formRef.current?.reset();
    }
  }, [state]);

  const errors = state.status === "error" ? state.errors : undefined;

  if (state.status === "success") {
    return (
      <div role="status" className="rounded-2xl border border-ink/8 bg-surface-muted p-8 text-center">
        <Image
          src="/assets/mor/hero-win.webp"
          alt="Mor, the RADHA peacock, celebrating with wings spread"
          width={1254}
          height={1254}
          className="mx-auto mb-2 h-20 w-20 object-contain"
        />
        <h2 className="text-xl font-semibold text-ink">Request received</h2>
        <p className="mt-2 text-sm text-ink-muted">
          Thanks — someone from the RADHA team will follow up within one
          business day.
        </p>
      </div>
    );
  }

  return (
    <form ref={formRef} action={formAction} noValidate className="flex flex-col gap-5">
      {errors ? (
        <div
          ref={errorSummaryRef}
          tabIndex={-1}
          role="alert"
          aria-live="assertive"
          className="rounded-xl border border-danger/30 bg-danger/10 p-4 text-sm text-danger"
        >
          Please fix the highlighted fields below.
        </div>
      ) : null}

      <div>
        <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-ink">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          aria-invalid={Boolean(errors?.name)}
          aria-describedby={errors?.name ? "name-error" : undefined}
          className="w-full rounded-xl border border-ink/15 bg-surface px-4 py-3 text-ink focus-visible:outline-2 focus-visible:outline-offset-2"
        />
        <FieldError id="name-error" message={errors?.name} />
      </div>

      <div>
        <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-ink">
          Work email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          aria-invalid={Boolean(errors?.email)}
          aria-describedby={errors?.email ? "email-error" : undefined}
          className="w-full rounded-xl border border-ink/15 bg-surface px-4 py-3 text-ink focus-visible:outline-2 focus-visible:outline-offset-2"
        />
        <FieldError id="email-error" message={errors?.email} />
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
          className="w-full rounded-xl border border-ink/15 bg-surface px-4 py-3 text-ink focus-visible:outline-2 focus-visible:outline-offset-2"
        />
      </div>

      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-ink">
          What would you like to see?
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          aria-invalid={Boolean(errors?.message)}
          aria-describedby={errors?.message ? "message-error" : undefined}
          className="w-full rounded-xl border border-ink/15 bg-surface px-4 py-3 text-ink focus-visible:outline-2 focus-visible:outline-offset-2"
        />
        <FieldError id="message-error" message={errors?.message} />
      </div>

      <SubmitButton />
    </form>
  );
}
