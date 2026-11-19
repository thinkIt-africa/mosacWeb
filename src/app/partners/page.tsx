import type { Metadata } from "next";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { PageHero } from "@/components/sections/Heroes";
import { SectionHeader } from "@/components/ui/Primitives";
import { mediaFor } from "@/lib/content";

export const metadata: Metadata = {
  title: { absolute: "Partner with MOSAC — Motorsport Sponsorship" },
  description:
    "Motorsport brings together live excitement, technical excellence, strong communities and stories that travel. Work with MOSAC on meaningful activations that support safe, credible participation.",
};

// Doc 01, section 14 — Possible programmes.
const programmes = [
  "Event title/associate sponsorship",
  "Technical services",
  "Media production",
  "Sanctioned esports activations",
  "Responsible hospitality",
  "Youth participation",
  "Community outreach",
  "Event sustainability",
];

const tiers = ["Title", "Event", "Technology", "Community", "In-Kind"];

/** Partners (03, section Q; copy from 01, section 14). Tiers are labelled "proposed" until approved. */
export default function PartnersPage() {
  return (
    <>
      <PageHero
        asset={mediaFor("esportsLaunchGroup")}
        eyebrow="Partners"
        title="Put your brand where passion meets purpose"
        lead="Motorsport brings together live excitement, technical excellence, strong communities and stories that travel. Work with MOSAC on meaningful activations that support safe, credible participation."
      />

      <section aria-labelledby="programmes" className="py-20 md:py-28">
        <div className="container-site">
          <SectionHeader id="programmes" title="Possible programmes" />
          <ul className="grid gap-px bg-black/10 sm:grid-cols-2 lg:grid-cols-4">
            {programmes.map((p) => (
              <li key={p} className="bg-white p-6 text-lg font-semibold" data-reveal>
                {p}
              </li>
            ))}
          </ul>
          <div className="mt-12">
            <p className="eyebrow text-ink-soft">Conceptual tiers (to be priced and approved)</p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {tiers.map((t) => (
                <li key={t} className="display bg-midnight px-4 py-2 text-xl text-white">
                  {t}
                </li>
              ))}
            </ul>
            <p className="mt-6 max-w-2xl text-sm text-ink-soft">
              FMU affiliation is not a sponsor endorsement. Event partner logos belong on the applicable event pages with
              formal usage permissions.
            </p>
          </div>
        </div>
      </section>

      <section aria-labelledby="partner-form" className="bg-white py-20 md:py-28">
        <div className="container-site grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <h2 id="partner-form" className="display text-5xl md:text-6xl">
              Request a partnership conversation
            </h2>
          </div>
          <div className="max-w-xl lg:col-span-7">
            <EnquiryForm
              formId="partners"
              submitLabel="Request a Partnership Conversation"
              fields={[
                { name: "organisation", label: "Organisation", required: true, autoComplete: "organization" },
                { name: "name", label: "Contact name", required: true, autoComplete: "name" },
                { name: "email", label: "Email", type: "email", required: true, autoComplete: "email" },
                { name: "phone", label: "Phone", type: "tel", autoComplete: "tel" },
                { name: "interest", label: "Interest category", type: "select", options: programmes },
                { name: "timing", label: "Estimated timing" },
                { name: "message", label: "Message", type: "textarea", required: true },
              ]}
            />
          </div>
        </div>
      </section>
    </>
  );
}
