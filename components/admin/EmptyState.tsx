"use client";

import { SearchX } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";

interface EmptyStateProps {
  title?: string;
  description?: string;
  onClearFilters?: () => void;
}

export function EmptyState({
  title,
  description,
  onClearFilters,
}: EmptyStateProps) {
  const { lang } = useLanguage();

  const defaultTitle =
    title ||
    (lang === "mr"
      ? "कोणतीही प्रोफाइल्स आढळली नाहीत"
      : "No profiles match these filters");

  const defaultDesc =
    description ||
    (lang === "mr"
      ? "कृपया शोध शब्द किंवा निवडलेले फिल्टर्स बदलून पुन्हा प्रयत्न करा."
      : "Try relaxing your search terms or clearing specific demographic filters.");

  return (
    <div className="bg-[var(--surface)] border border-[var(--line)] rounded-[var(--radius-card)] p-12 text-center flex flex-col items-center justify-center max-w-[480px] mx-auto my-8">
      <div className="w-12 h-12 rounded-full bg-[var(--surface-2)] flex items-center justify-center text-[var(--ink-muted)] mb-4">
        <SearchX className="w-6 h-6" />
      </div>

      <h3 className="font-serif text-xl text-[var(--ink)] font-normal mb-2">
        {defaultTitle}
      </h3>

      <p className="text-xs sm:text-sm text-[var(--ink-muted)] leading-relaxed mb-6">
        {defaultDesc}
      </p>

      {onClearFilters && (
        <button
          type="button"
          onClick={onClearFilters}
          className="btn-secondary h-9 px-4 text-xs font-medium"
        >
          {lang === "mr" ? "सर्व फिल्टर्स रीसेट करा" : "Reset All Filters"}
        </button>
      )}
    </div>
  );
}

