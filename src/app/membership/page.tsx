import type { Metadata } from "next";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { PageHero } from "@/components/sections/Heroes";
import { SectionHeader } from "@/components/ui/Primitives";
import { mediaFor } from "@/lib/content";

export const metadata: Metadata = {
  title: { absolute: "Join MOSAC — Membership, Support and Volunteering" },
  description:
    "The best motorsport clubs are built by people with different strengths. Drivers, navigators and mechanics share the same passion as volunteers, safety crews, photographers, supporters and organisers.",
};

// Doc 01, section 08 — Pathways and Membership flow, word for word.
const pathways = [
  ["Compete", "Enquire about club membership, licences and sanctioned entry."],
  ["Volunteer", "Offer to assist with event operations, marshaling, media or administration, subject to training."],
  ["Support", "Discover safe spectating and club community."],
  ["Partner", "Support a specific event or long-term development platform."],
];

const flow = ["Express interest", "Club reviews eligibility", "Correct category/fees communicated", "Approval", "Welcome and member updates"];

/** Membership — "Belong" (03, section K; copy from 01, section 08). Register interest only (D11). */
export default function MembershipPage() {
  return (
    <>
      <PageHero
        asset={mediaFor("kigeziGroup")}
        eyebrow="Membership & community"
        title="You don’t have to be behind the wheel to belong"
        lead="The best motorsport clubs are built by people with different strengths. Drivers, navigators and mechanics share the same passion as volunteers, safety crews, photographers, supporters and organisers."
      />

      <section aria-labelledby="pathways" className="py-20 md:py-28">
        <div className="container-site">
          <SectionHeader id="pathways" title="Pathways" />
          <ul className="grid gap-px bg-black/10 sm:grid-cols-2 lg:grid-cols-4">
            {pathways.map(([title, text], i) => (
              <li key={title} className="bg-white p-6 md:p-8" data-reveal>
                <p className="display tabular text-5xl text-red">{String(i + 1).padStart(2, "0")}</p>
                <h3 className="display mt-4 text-3xl">{title}</h3>
                <p className="mt-2 text-ink-soft">{text}</p>
              </li>
            ))}
          </ul>
          <ol className="mt-12 flex flex-wrap gap-x-2 gap-y-3 text-sm font-semibold" aria-label="How membership works">
            {flow.map((step, i) => (
              <li key={step} className="flex items-center gap-2">
                <span className="bg-midnight px-3 py-2 text-white">{step}</span>
                {i < flow.length - 1 && <span aria-hidden="true">→</span>}
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="register" aria-labelledby="register-h" className="scroll-mt-28 bg-white py-20 md:py-28">
        <div className="container-site grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <h2 id="register-h" className="display text-5xl md:text-6xl">
              Register Interest
            </h2>
          </div>
          <div className="max-w-xl lg:col-span-7">
            <EnquiryForm
              formId="membership"
              submitLabel="Register Interest"
              fields={[
                { name: "name", label: "Full name", required: true, autoComplete: "name" },
                { name: "email", label: "Email", type: "email", required: true, autoComplete: "email" },
                { name: "phone", label: "Phone", type: "tel", autoComplete: "tel" },
                { name: "district", label: "District" },
                { name: "pathway", label: "Pathway", type: "select", required: true, options: ["Compete", "Volunteer", "Support", "Partner"] },
                { name: "experience", label: "Relevant experience", type: "textarea" },
                { name: "message", label: "Message", type: "textarea" },
              ]}
            />
          </div>
        </div>
      </section>
    </>
  );
}
