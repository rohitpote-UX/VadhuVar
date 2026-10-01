import Link from "next/link";
import { BRAND } from "@/lib/constants/brand";

export default function TermsPage() {
  return (
    <div className="pt-32 pb-24 px-5 sm:px-8 md:px-12 max-w-[800px] mx-auto">
      <div className="mb-10">
        <Link
          href="/"
          className="link-ghost text-sm text-[var(--ink-muted)] mb-6 inline-flex"
        >
          &larr; Back to Home
        </Link>
        <span className="eyebrow block mb-2">ENGAGEMENT TERMS</span>
        <h1 className="font-serif text-4xl sm:text-5xl text-[var(--ink)] font-normal mb-4">
          Terms of Engagement
        </h1>
        <p className="text-sm text-[var(--ink-muted)]">
          Last updated: October 2026
        </p>
      </div>

      <div className="space-y-8 text-[1.0625rem] leading-[1.7] text-[var(--ink-muted)] border-t border-[var(--line)] pt-8">
        <section>
          <h2 className="font-serif text-2xl text-[var(--ink)] mb-3 font-normal">
            1. Registration Eligibility
          </h2>
          <p>
            Registration with {BRAND.name} is strictly restricted to individuals
            who are 18 years of age or older, legally eligible for marriage
            under the laws of India, and registering either directly for
            themselves or on behalf of an immediate family member with verified
            consent.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-2xl text-[var(--ink)] mb-3 font-normal">
            2. Truthfulness of Information
          </h2>
          <p>
            By submitting your profile, you affirm that all details including
            age, educational qualifications, marital status, employment, and
            family background are accurate, honest, and up to date.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-2xl text-[var(--ink)] mb-3 font-normal">
            3. Scope of Matchmaking Service
          </h2>
          <p>
            {BRAND.name} provides professional matchmaking curation and
            introductions. While every effort is made to assess compatibility
            and verify backgrounds, final matrimonial decisions remain the sole
            responsibility of the candidates and their respective families.
          </p>
        </section>
      </div>
    </div>
  );
}
