import type { Metadata } from "next";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { PendingNote } from "@/components/sections/Blocks";
import { PageHero } from "@/components/sections/Heroes";
import { ButtonLink } from "@/components/ui/Button";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: { absolute: "Contact MOSAC — Events, Membership and Partnerships" },
  description:
    "Have a question about membership, an idea for an event, an old photograph to contribute or a partnership to discuss? We’ll direct your enquiry to the right part of the club.",
};

/** Contact (03, section R; copy from 01, section 15). No guessed numbers, emails or addresses. */
export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Let’s talk motorsport"
        lead="Have a question about membership, an idea for an event, an old photograph to contribute or a partnership to discuss? We’ll direct your enquiry to the right part of the club."
      />
      <section className="py-20 md:py-28">
        <div className="container-site grid gap-12 lg:grid-cols-12">
          <div className="max-w-xl lg:col-span-7">
            <EnquiryForm
              formId="contact"
              submitLabel="Send Enquiry"
              fields={[
                { name: "name", label: "Name", required: true, autoComplete: "name" },
                { name: "email", label: "Email", type: "email", required: true, autoComplete: "email" },
                { name: "phone", label: "Phone", type: "tel", autoComplete: "tel" },
                {
                  name: "type",
                  label: "Enquiry type",
                  type: "select",
                  required: true,
                  // Doc 01 channels + doc 03 routing (Membership, Event, Media, Partner, Archive)
                  options: ["General Enquiries", "Membership", "Events", "Media", "Partnerships", "Archive"],
                },
                { name: "subject", label: "Subject", required: true },
                { name: "message", label: "Message", type: "textarea", required: true },
              ]}
            />
          </div>
          <aside className="space-y-6 lg:col-span-5">
            <PendingNote />
            <div className="bg-midnight p-6 text-white">
              <p className="eyebrow text-gold">Who sanctions motorsport in Uganda?</p>
              <p className="mt-2">
                <a href={site.fmuUrl} rel="noopener" className="underline decoration-gold underline-offset-4">
                  FMU
                </a>{" "}
                is the national federation; MOSAC participates as a member club and may organise approved events.
              </p>
            </div>
            <ButtonLink href="/membership" variant="outline-dark">
              Explore Membership
            </ButtonLink>
          </aside>
        </div>
      </section>
    </>
  );
}
