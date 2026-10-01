import Link from "next/link";
import { BRAND } from "@/lib/constants/brand";

export default function PrivacyPage() {
  return (
    <div className="pt-32 pb-24 px-5 sm:px-8 md:px-12 max-w-[800px] mx-auto">
      <div className="mb-10">
        <Link
          href="/"
          className="link-ghost text-sm text-[var(--ink-muted)] mb-6 inline-flex"
        >
          &larr; Back to Home
        </Link>
        <span className="eyebrow block mb-2">LEGAL &amp; TRUST</span>
        <h1 className="font-serif text-4xl sm:text-5xl text-[var(--ink)] font-normal mb-4">
          Privacy Policy
        </h1>
        <p className="text-sm text-[var(--ink-muted)]">
          Last updated: October 2026
        </p>
      </div>

      <div className="space-y-8 text-[1.0625rem] leading-[1.7] text-[var(--ink-muted)] border-t border-[var(--line)] pt-8">
        <section>
          <h2 className="font-serif text-2xl text-[var(--ink)] mb-3 font-normal">
            1. Principle of Absolute Privacy
          </h2>
          <p>
            {BRAND.name} is a closed-access personal matrimonial practice. We
            do not operate open search engines, social catalogs, or automated
            recommendation feeds. Your profile, including your photograph,
            contact details, and biodata documents, is treated with strict
            confidentiality.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-2xl text-[var(--ink)] mb-3 font-normal">
            2. Controlled Information Sharing
          </h2>
          <p>
            No information submitted through our registration portal is made
            accessible to the general public or other registrants without your
            direct consent. When our matchmaker identifies a prospective
            alignment, profile summaries are shared in strict accordance with
            your privacy instructions.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-2xl text-[var(--ink)] mb-3 font-normal">
            3. Data Retention and Deletion
          </h2>
          <p>
            You may request complete de-registration and permanent deletion of
            your records, photographs, and attached biodata at any time by
            contacting our concierge at{" "}
            <a
              href={`mailto:${BRAND.contact.email}`}
              className="text-[var(--accent)] underline"
            >
              {BRAND.contact.email}
            </a>
            .
          </p>
        </section>

        <section>
          <h2 className="font-serif text-2xl text-[var(--ink)] mb-3 font-normal">
            4. Security Standards
          </h2>
          <p>
            All submitted materials are stored securely with encrypted access
            restricted exclusively to the certified matchmaker and authorized
            administrative personnel.
          </p>
        </section>
      </div>
    </div>
  );
}
