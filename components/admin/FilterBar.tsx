"use client";

import { useState } from "react";
import { Search, SlidersHorizontal, ChevronDown, ChevronUp } from "lucide-react";
import { ProfileFilters, Gender, ProfileStatus, MaritalStatus } from "@/types/profile";
import { GENDERS, MARITAL_STATUSES, POPULAR_CITIES, EDUCATION_LEVELS } from "@/lib/constants/options";

interface FilterBarProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  filters: ProfileFilters;
  onFilterChange: (newFilters: ProfileFilters) => void;
}

import { useLanguage } from "@/lib/i18n/LanguageContext";

export function FilterBar({
  searchQuery,
  onSearchChange,
  filters,
  onFilterChange,
}: FilterBarProps) {
  const [panelOpen, setPanelOpen] = useState(false);
  const { t, language } = useLanguage();

  // Compute active filter count
  let activeFilterCount = 0;
  if (filters.gender && filters.gender.length > 0) activeFilterCount += filters.gender.length;
  if (filters.statuses && filters.statuses.length > 0) activeFilterCount += filters.statuses.length;
  if (filters.locations && filters.locations.length > 0) activeFilterCount += filters.locations.length;
  if (filters.maritalStatuses && filters.maritalStatuses.length > 0) activeFilterCount += filters.maritalStatuses.length;
  if (filters.educations && filters.educations.length > 0) activeFilterCount += filters.educations.length;
  if (filters.ageMin && filters.ageMin > 18) activeFilterCount++;
  if (filters.ageMax && filters.ageMax < 60) activeFilterCount++;

  const toggleGender = (g: Gender) => {
    const current = filters.gender || [];
    const updated = current.includes(g)
      ? current.filter((item) => item !== g)
      : [...current, g];
    onFilterChange({ ...filters, gender: updated });
  };

  const toggleStatus = (s: ProfileStatus) => {
    const current = filters.statuses || [];
    const updated = current.includes(s)
      ? current.filter((item) => item !== s)
      : [...current, s];
    onFilterChange({ ...filters, statuses: updated });
  };

  const toggleLocation = (loc: string) => {
    const current = filters.locations || [];
    const city = loc.split(",")[0].trim();
    const updated = current.includes(city)
      ? current.filter((item) => item !== city)
      : [...current, city];
    onFilterChange({ ...filters, locations: updated });
  };

  const statusLabels: Record<ProfileStatus, { en: string; mr: string }> = {
    new: { en: "Needs Review", mr: "पुनरावलोकन आवश्यक" },
    active: { en: "Active", mr: "सक्रिय प्रोफाइल्स" },
    matched: { en: "Matched", mr: "जुळलेली प्रोफाइल्स" },
    inactive: { en: "Inactive", mr: "निष्क्रिय प्रोफाइल्स" },
    closed: { en: "Closed", mr: "बंद प्रोफाइल्स" },
  };

  const citiesList = [
    { en: "Pune", mr: "पुणे" },
    { en: "Mumbai", mr: "मुंबई" },
    { en: "Nashik", mr: "नाशिक" },
    { en: "Kolhapur", mr: "कोल्हापूर" },
    { en: "Satara", mr: "सातारा" },
    { en: "Nagpur", mr: "नागपूर" },
    { en: "Solapur", mr: "सोलापूर" },
    { en: "Sangli", mr: "सांगली" },
    { en: "Ahilyanagar", mr: "अहिल्यानगर" },
    { en: "Chhatrapati Sambhajinagar", mr: "छ. संभाजीनगर" },
  ];

  return (
    <div className="bg-[var(--surface)] border border-[var(--line)] rounded-[var(--radius-card)] p-4 shadow-xs space-y-4">
      {/* Top Search & Filter Toggle Row */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-[var(--ink-muted)] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder={t.admin.searchPlaceholder}
            className="w-full h-11 pl-10 pr-4 rounded-lg bg-[var(--surface-2)]/60 border border-[var(--line)] text-sm text-[var(--ink)] placeholder:text-[var(--ink-faint)] focus:border-[var(--accent)] focus:bg-[var(--surface)] transition-colors"
          />
        </div>

        {/* Filters Toggle Button */}
        <button
          type="button"
          onClick={() => setPanelOpen(!panelOpen)}
          className={`flex items-center justify-center gap-2 h-11 px-4 rounded-lg border text-xs font-medium transition-colors cursor-pointer ${
            panelOpen || activeFilterCount > 0
              ? "bg-[var(--accent-soft)] border-[var(--accent)] text-[var(--accent)]"
              : "bg-[var(--surface)] border-[var(--line)] text-[var(--ink)] hover:bg-[var(--surface-2)]"
          }`}
          aria-expanded={panelOpen}
        >
          <SlidersHorizontal className="w-3.5 h-3.5" />
          <span>{language === "mr" ? "फिल्टर्स" : "Filters"}</span>
          {activeFilterCount > 0 && (
            <span className="w-5 h-5 rounded-full bg-[var(--accent)] text-[#FAF7F2] text-[10px] font-bold flex items-center justify-center tabular-nums">
              {activeFilterCount}
            </span>
          )}
          {panelOpen ? (
            <ChevronUp className="w-3.5 h-3.5 ml-1" />
          ) : (
            <ChevronDown className="w-3.5 h-3.5 ml-1" />
          )}
        </button>
      </div>

      {/* Expandable Multi-Filter Grid */}
      {panelOpen && (
        <div className="pt-4 border-t border-[var(--line)] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 animate-in fade-in duration-150">
          {/* Gender Filter */}
          <div>
            <span className="text-xs uppercase tracking-wider font-semibold text-[var(--ink-muted)] block mb-2.5">
              {t.admin.filterGender}
            </span>
            <div className="flex flex-wrap gap-1.5">
              {GENDERS.map((g) => {
                const active = (filters.gender || []).includes(g);
                const label =
                  g === "Female"
                    ? language === "mr"
                      ? "वधू (स्त्री)"
                      : "Bride"
                    : g === "Male"
                    ? language === "mr"
                      ? "वर (पुरुष)"
                      : "Groom"
                    : g;
                return (
                  <button
                    key={g}
                    type="button"
                    onClick={() => toggleGender(g)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors cursor-pointer ${
                      active
                        ? "bg-[var(--accent)] text-white border-[var(--accent)]"
                        : "bg-[var(--surface-2)] text-[var(--ink)] border-transparent hover:border-[var(--line)]"
                    }`}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Profile Status Filter */}
          <div>
            <span className="text-xs uppercase tracking-wider font-semibold text-[var(--ink-muted)] block mb-2.5">
              {language === "mr" ? "स्थिती (Status)" : "Lifecycle Status"}
            </span>
            <div className="flex flex-wrap gap-1.5">
              {(["new", "active", "matched", "inactive", "closed"] as ProfileStatus[]).map(
                (st) => {
                  const active = (filters.statuses || []).includes(st);
                  const lbl = language === "mr" ? statusLabels[st].mr : statusLabels[st].en;
                  return (
                    <button
                      key={st}
                      type="button"
                      onClick={() => toggleStatus(st)}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors cursor-pointer ${
                        active
                          ? "bg-[var(--accent)] text-white border-[var(--accent)]"
                          : "bg-[var(--surface-2)] text-[var(--ink)] border-transparent hover:border-[var(--line)]"
                      }`}
                    >
                      {lbl}
                    </button>
                  );
                }
              )}
            </div>
          </div>

          {/* Age Range Filter */}
          <div>
            <span className="text-xs uppercase tracking-wider font-semibold text-[var(--ink-muted)] block mb-2.5">
              {t.admin.filterAge}
            </span>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <span className="text-[10px] text-[var(--ink-muted)] block mb-0.5">
                  {t.register.fields.minAge}
                </span>
                <input
                  type="number"
                  min={18}
                  max={60}
                  value={filters.ageMin || 18}
                  onChange={(e) =>
                    onFilterChange({
                      ...filters,
                      ageMin: parseInt(e.target.value) || 18,
                    })
                  }
                  className="w-full h-9 px-3 rounded border border-[var(--line)] bg-[var(--surface)] text-xs text-[var(--ink)] tabular-nums"
                />
              </div>
              <div>
                <span className="text-[10px] text-[var(--ink-muted)] block mb-0.5">
                  {t.register.fields.maxAge}
                </span>
                <input
                  type="number"
                  min={18}
                  max={60}
                  value={filters.ageMax || 60}
                  onChange={(e) =>
                    onFilterChange({
                      ...filters,
                      ageMax: parseInt(e.target.value) || 60,
                    })
                  }
                  className="w-full h-9 px-3 rounded border border-[var(--line)] bg-[var(--surface)] text-xs text-[var(--ink)] tabular-nums"
                />
              </div>
            </div>
          </div>

          {/* City / Location Multi Filter */}
          <div>
            <span className="text-xs uppercase tracking-wider font-semibold text-[var(--ink-muted)] block mb-2.5">
              {language === "mr" ? "महाराष्ट्रातील शहरे" : "Maharashtra Cities"}
            </span>
            <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto pr-1">
              {citiesList.map((city) => {
                const active = (filters.locations || []).includes(city.en);
                return (
                  <button
                    key={city.en}
                    type="button"
                    onClick={() => toggleLocation(city.en)}
                    className={`px-2.5 py-1 rounded-full text-xs font-medium border transition-colors cursor-pointer ${
                      active
                        ? "bg-[var(--accent)] text-white border-[var(--accent)]"
                        : "bg-[var(--surface-2)] text-[var(--ink)] border-transparent hover:border-[var(--line)]"
                    }`}
                  >
                    {language === "mr" ? city.mr : city.en}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
