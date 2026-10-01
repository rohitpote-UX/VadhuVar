"use client";

import Link from "next/link";
import { useLanguage, LanguageSwitcher } from "@/lib/i18n/LanguageContext";

interface StepProgressProps {
  currentStep: number;
  totalSteps: number;
  stepTitles: string[];
  onBack?: () => void;
}

export function StepProgress({
  currentStep,
  totalSteps,
  stepTitles,
  onBack,
}: StepProgressProps) {
  const { t, language } = useLanguage();
  const percentage = Math.round((currentStep / totalSteps) * 100);

  const stepCounterText =
    language === "mr"
      ? `पायरी ${currentStep} पैकी ${totalSteps}`
      : `Step ${currentStep} of ${totalSteps}`;

  return (
    <header className="sticky top-0 z-30 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[var(--line)] pt-[env(safe-area-inset-top)]">
      {/* 2px accent progress line */}
      <div className="w-full h-1 bg-[var(--line)] relative overflow-hidden">
        <div
          className="h-full bg-[var(--accent)] transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"
          style={{ width: `${percentage}%` }}
          role="progressbar"
          aria-valuenow={currentStep}
          aria-valuemin={1}
          aria-valuemax={totalSteps}
        />
      </div>

      <div className="max-w-[760px] mx-auto px-4 sm:px-8 h-16 flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          {currentStep > 1 ? (
            <button
              type="button"
              onClick={onBack}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--ink-muted)] hover:text-[var(--ink)] focus-visible:ring-2 focus-visible:ring-[var(--accent)] rounded p-1.5 transition-colors cursor-pointer"
              aria-label="Previous step"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              <span className="hidden sm:inline">{t.register.back}</span>
            </button>
          ) : (
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--ink-muted)] hover:text-[var(--ink)] focus-visible:ring-2 focus-visible:ring-[var(--accent)] rounded p-1.5 transition-colors"
              aria-label="Return home"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              <span className="hidden sm:inline">
                {language === "mr" ? "बाहेर पडा" : "Exit"}
              </span>
            </Link>
          )}

          <div className="flex flex-col">
            <span className="text-xs font-semibold tracking-wide text-[var(--accent)]">
              {stepCounterText}
            </span>
            <span className="text-sm font-serif text-[var(--ink)] font-normal hidden sm:block">
              {stepTitles[currentStep - 1]}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <LanguageSwitcher />
          <Link
            href="/"
            className="font-serif text-lg tracking-[-0.02em] text-[var(--ink)] hover:text-[var(--accent)] transition-colors hidden md:block"
          >
            {t.nav.brand}
          </Link>
        </div>
      </div>
    </header>
  );
}
