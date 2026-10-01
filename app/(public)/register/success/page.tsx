"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function RegistrationSuccessPage() {
  const { t, language } = useLanguage();

  return (
    <div className="min-h-[85vh] flex flex-col items-center justify-center px-5 sm:px-8 py-20 text-center max-w-[640px] mx-auto">
      {/* Decorative success check pill */}
      <div className="w-16 h-16 rounded-full bg-[var(--surface-2)] border border-[var(--line)] flex items-center justify-center text-[var(--accent)] mb-8 shadow-sm">
        <svg
          className="w-8 h-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5 13l4 4L19 7"
          />
        </svg>
      </div>

      <div className="flex items-center gap-2 mb-3">
        <span className="kesari-dot" />
        <span className="eyebrow block text-[var(--accent)] font-semibold">
          {language === "mr" ? "नोंदणी प्राप्त झाली" : "REGISTRATION RECEIVED"}
        </span>
      </div>

      <h1 className="font-serif text-[clamp(2.25rem,5vw,3.5rem)] leading-[1.12] tracking-[-0.02em] text-[var(--ink)] mb-5 font-normal">
        {t.register.success.title}
      </h1>

      <p className="text-base sm:text-lg text-[var(--ink-muted)] max-w-[50ch] leading-relaxed mb-10">
        {t.register.success.message}
      </p>

      <div className="flex flex-col sm:flex-row items-center gap-4">
        <Link href="/" className="btn-primary">
          {t.register.success.backHome} &rarr;
        </Link>
      </div>
    </div>
  );
}
