"use client";

import { ProfileFilters } from "@/types/profile";
import { X } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";

interface FilterChipsProps {
  filters: ProfileFilters;
  totalMatches: number;
  totalProfiles: number;
  onRemoveFilter: (key: keyof ProfileFilters, value?: string) => void;
  onClearAll: () => void;
}

export function FilterChips({
  filters,
  totalMatches,
  totalProfiles,
  onRemoveFilter,
  onClearAll,
}: FilterChipsProps) {
  const { lang } = useLanguage();
  const chips: { key: keyof ProfileFilters; label: string; value?: string }[] = [];

  const genderLabel = lang === "mr" ? "लिंग" : "Gender";
  const ageLabel = lang === "mr" ? "वय" : "Age";
  const statusLabel = lang === "mr" ? "स्थिती" : "Status";
  const cityLabel = lang === "mr" ? "शहर" : "City";
  const maritalLabel = lang === "mr" ? "वैवाहिक स्थिती" : "Marital";

  if (filters.gender && filters.gender.length > 0) {
    filters.gender.forEach((g) => {
      const gDisplay =
        lang === "mr"
          ? g === "Female"
            ? "वधू (स्त्री)"
            : "वर (पुरुष)"
          : g;

      chips.push({ key: "gender", label: `${genderLabel}: ${gDisplay}`, value: g });
    });
  }

  if (filters.ageMin !== undefined && filters.ageMin > 18) {
    chips.push({ key: "ageMin", label: `${ageLabel} ≥ ${filters.ageMin}` });
  }

  if (filters.ageMax !== undefined && filters.ageMax < 60) {
    chips.push({ key: "ageMax", label: `${ageLabel} ≤ ${filters.ageMax}` });
  }

  if (filters.statuses && filters.statuses.length > 0) {
    filters.statuses.forEach((s) => {
      const sMap: Record<string, string> = {
        new: lang === "mr" ? "नवीन" : "New",
        active: lang === "mr" ? "सक्रिय" : "Active",
        matched: lang === "mr" ? "जुळलेले" : "Matched",
        inactive: lang === "mr" ? "निष्क्रिय" : "Inactive",
        closed: lang === "mr" ? "बंद" : "Closed",
      };
      chips.push({ key: "statuses", label: `${statusLabel}: ${sMap[s] || s}`, value: s });
    });
  }

  if (filters.locations && filters.locations.length > 0) {
    filters.locations.forEach((loc) => {
      chips.push({ key: "locations", label: `${cityLabel}: ${loc}`, value: loc });
    });
  }

  if (filters.maritalStatuses && filters.maritalStatuses.length > 0) {
    filters.maritalStatuses.forEach((ms) => {
      chips.push({ key: "maritalStatuses", label: `${maritalLabel}: ${ms}`, value: ms });
    });
  }

  if (filters.educations && filters.educations.length > 0) {
    filters.educations.forEach((edu) => {
      chips.push({ key: "educations", label: `${lang === "mr" ? "शिक्षण" : "Edu"}: ${edu}`, value: edu });
    });
  }

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
      {/* Active Filter Chips */}
      <div className="flex flex-wrap items-center gap-2">
        {chips.map((chip, idx) => (
          <span
            key={`${chip.key}_${chip.value || idx}`}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-[var(--surface-2)] text-[var(--ink)] border border-[var(--line)]"
          >
            <span>{chip.label}</span>
            <button
              type="button"
              onClick={() => onRemoveFilter(chip.key, chip.value)}
              className="text-[var(--ink-muted)] hover:text-[var(--ink)]"
              aria-label={`Remove filter ${chip.label}`}
            >
              <X className="w-3 h-3" />
            </button>
          </span>
        ))}

        {chips.length > 0 && (
          <button
            type="button"
            onClick={onClearAll}
            className="text-xs text-[var(--accent)] hover:underline font-medium ml-1"
          >
            {lang === "mr" ? "सर्व काढा" : "Clear all"}
          </button>
        )}
      </div>

      {/* Profile Count */}
      <span className="text-xs text-[var(--ink-muted)] tabular-nums">
        {lang === "mr" ? (
          <>
            एकूण <span className="text-[var(--ink)]">{totalProfiles}</span> पैकी{" "}
            <strong className="text-[var(--ink)] font-semibold">{totalMatches}</strong> प्रोफाइल्स
          </>
        ) : (
          <>
            Showing <strong className="text-[var(--ink)] font-semibold">{totalMatches}</strong> of{" "}
            <span className="text-[var(--ink)]">{totalProfiles}</span> profiles
          </>
        )}
      </span>
    </div>
  );
}

