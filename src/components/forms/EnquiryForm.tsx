"use client";

import { useActionState } from "react";
import { submitEnquiry, type EnquiryState } from "@/app/actions/enquiry";

export interface FormField {
  name: string;
  label: string;
  type?: "text" | "email" | "tel" | "textarea" | "select";
  required?: boolean;
  options?: string[];
  hint?: string;
  autoComplete?: string;
}

const initial: EnquiryState = { status: "idle" };

/** Accessible enquiry form: visible labels, inline errors, live status, single-column on mobile. */
export function EnquiryForm({ formId, fields, submitLabel }: { formId: string; fields: FormField[]; submitLabel: string }) {
  const [state, action, pending] = useActionState(submitEnquiry, initial);
  const err = state.fieldErrors ?? {};

  return (
    <form action={action} noValidate className="space-y-6">
      <input type="hidden" name="form" value={formId} />
      <div aria-hidden="true" className="hidden">
        <label>
          Leave this empty
          <input type="text" name="company_website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      {fields.map((f) => {
        const id = `${formId}-${f.name}`;
        const describedBy = [f.hint ? `${id}-hint` : null, err[f.name] ? `${id}-err` : null].filter(Boolean).join(" ") || undefined;
        const cls = `mt-2 block w-full border-2 bg-white px-4 py-3 text-base outline-none focus:border-midnight ${
          err[f.name] ? "border-red-700" : "border-black/15"
        }`;
        return (
          <div key={f.name}>
            <label htmlFor={id} className="font-semibold">
              {f.label}
              {!f.required && <span className="font-normal text-ink-soft"> (optional)</span>}
            </label>
            {f.hint && (
              <p id={`${id}-hint`} className="mt-1 text-sm text-ink-soft">
                {f.hint}
              </p>
            )}
            {f.type === "textarea" ? (
              <textarea id={id} name={f.name} rows={5} required={f.required} aria-invalid={!!err[f.name]} aria-describedby={describedBy} className={cls} />
            ) : f.type === "select" ? (
              <select id={id} name={f.name} required={f.required} aria-describedby={describedBy} className={cls} defaultValue="">
                <option value="" disabled>
                  Choose one
                </option>
                {f.options?.map((o) => (
                  <option key={o}>{o}</option>
                ))}
              </select>
            ) : (
              <input
                id={id}
                name={f.name}
                type={f.type ?? "text"}
                required={f.required}
                autoComplete={f.autoComplete}
                aria-invalid={!!err[f.name]}
                aria-describedby={describedBy}
                className={cls}
              />
            )}
            {err[f.name] && (
              <p id={`${id}-err`} className="mt-1 text-sm font-semibold text-red-700">
                {err[f.name]}
              </p>
            )}
          </div>
        );
      })}

      <div>
        <label className="flex items-start gap-3">
          <input
            type="checkbox"
            name="consent"
            aria-invalid={!!err.consent}
            aria-describedby={err.consent ? `${formId}-consent-err` : undefined}
            className="mt-1 h-5 w-5 accent-red-600"
          />
          <span>I agree that MOSAC may use these details to respond to my enquiry, as described in the privacy notice.</span>
        </label>
        {err.consent && (
          <p id={`${formId}-consent-err`} className="mt-1 text-sm font-semibold text-red-700">
            {err.consent}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={pending}
        className="inline-flex min-h-12 items-center bg-red-600 px-8 font-bold tracking-wide text-white uppercase hover:bg-red-700 disabled:opacity-60"
      >
        {pending ? "Sending…" : submitLabel}
      </button>

      <div aria-live="polite" role="status">
        {state.message && state.status !== "idle" && (
          <p
            className={`border-l-4 px-4 py-3 ${
              state.status === "success" ? "border-steel bg-steel/10" : state.status === "not-connected" ? "border-gold bg-gold/15" : "border-red-700 bg-red/10"
            }`}
          >
            {state.message}
          </p>
        )}
      </div>
    </form>
  );
}
