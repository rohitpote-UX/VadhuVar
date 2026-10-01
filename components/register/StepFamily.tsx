"use client";

import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { RegistrationFormData } from "@/lib/schemas/profile.schema";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export function StepFamily() {
  const { register } = useFormContext<RegistrationFormData>();
  const { t, language } = useLanguage();
  const [showCulturalFields, setShowCulturalFields] = useState(false);

  return (
    <div className="space-y-6">
      {/* Father's Name */}
      <div>
        <label
          htmlFor="fatherName"
          className="block text-sm font-medium text-[var(--ink)] mb-2"
        >
          {t.register.fields.fatherName}{" "}
          <span className="text-xs font-normal text-[var(--ink-muted)]">
            ({language === "mr" ? "ऐच्छिक" : "Optional"})
          </span>
        </label>
        <input
          id="fatherName"
          type="text"
          placeholder={t.register.fields.fatherNamePlaceholder}
          {...register("fatherName")}
          className="w-full h-[52px] px-4 rounded-[var(--radius-card)] bg-[var(--surface)] border border-[var(--line)] text-base text-[var(--ink)] placeholder:text-[var(--ink-faint)] focus:border-[var(--accent)] transition-colors"
        />
      </div>

      {/* Mother's Name */}
      <div>
        <label
          htmlFor="motherName"
          className="block text-sm font-medium text-[var(--ink)] mb-2"
        >
          {t.register.fields.motherName}{" "}
          <span className="text-xs font-normal text-[var(--ink-muted)]">
            ({language === "mr" ? "ऐच्छिक" : "Optional"})
          </span>
        </label>
        <input
          id="motherName"
          type="text"
          placeholder={t.register.fields.motherNamePlaceholder}
          {...register("motherName")}
          className="w-full h-[52px] px-4 rounded-[var(--radius-card)] bg-[var(--surface)] border border-[var(--line)] text-base text-[var(--ink)] placeholder:text-[var(--ink-faint)] focus:border-[var(--accent)] transition-colors"
        />
      </div>

      {/* Family Background */}
      <div>
        <label
          htmlFor="familyBackground"
          className="block text-sm font-medium text-[var(--ink)] mb-2"
        >
          {t.register.fields.familyBackground}{" "}
          <span className="text-xs font-normal text-[var(--ink-muted)]">
            ({language === "mr" ? "ऐच्छिक" : "Optional"})
          </span>
        </label>
        <select
          id="familyBackground"
          {...register("familyBackground")}
          className="w-full h-[52px] px-4 rounded-[var(--radius-card)] bg-[var(--surface)] border border-[var(--line)] text-base text-[var(--ink)] focus:border-[var(--accent)] transition-colors"
        >
          <option value="">
            {language === "mr" ? "कुटुंब प्रकार निवडा" : "Select structure"}
          </option>
          <option value="Nuclear">{t.register.fields.nuclearFamily}</option>
          <option value="Joint">{t.register.fields.jointFamily}</option>
          <option value="Other">{language === "mr" ? "इतर" : "Other"}</option>
        </select>
      </div>

      {/* Siblings */}
      <div>
        <label
          htmlFor="siblings"
          className="block text-sm font-medium text-[var(--ink)] mb-2"
        >
          {t.register.fields.siblings}{" "}
          <span className="text-xs font-normal text-[var(--ink-muted)]">
            ({language === "mr" ? "ऐच्छिक" : "Optional"})
          </span>
        </label>
        <input
          id="siblings"
          type="text"
          placeholder={t.register.fields.siblingsPlaceholder}
          {...register("siblings")}
          className="w-full h-[52px] px-4 rounded-[var(--radius-card)] bg-[var(--surface)] border border-[var(--line)] text-base text-[var(--ink)] placeholder:text-[var(--ink-faint)] focus:border-[var(--accent)] transition-colors"
        />
      </div>

      {/* Family Native / Resident Location */}
      <div>
        <label
          htmlFor="familyLocation"
          className="block text-sm font-medium text-[var(--ink)] mb-2"
        >
          {t.register.fields.familyLocation}{" "}
          <span className="text-xs font-normal text-[var(--ink-muted)]">
            ({language === "mr" ? "ऐच्छिक" : "Optional"})
          </span>
        </label>
        <input
          id="familyLocation"
          type="text"
          placeholder={t.register.fields.familyLocationPlaceholder}
          {...register("familyLocation")}
          className="w-full h-[52px] px-4 rounded-[var(--radius-card)] bg-[var(--surface)] border border-[var(--line)] text-base text-[var(--ink)] placeholder:text-[var(--ink-faint)] focus:border-[var(--accent)] transition-colors"
        />
      </div>

      {/* Optional Maharashtra Cultural & Heritage Section */}
      <div className="pt-4 border-t border-[var(--line)]">
        <button
          type="button"
          onClick={() => setShowCulturalFields(!showCulturalFields)}
          className="w-full p-4 rounded-[var(--radius-card)] bg-[var(--surface-2)] border border-[var(--line)] flex items-center justify-between text-left hover:border-[var(--accent)] transition-colors cursor-pointer"
        >
          <div className="flex items-center gap-2.5">
            <span className="kesari-dot" />
            <div>
              <span className="text-sm font-semibold text-[var(--ink)] block">
                {t.register.fields.culturalSection}
              </span>
              <span className="text-xs text-[var(--ink-muted)] block">
                {t.register.fields.culturalSectionDesc}
              </span>
            </div>
          </div>
          <span className="text-xs text-[var(--accent)] font-medium">
            {showCulturalFields
              ? language === "mr"
                ? "लपवा ▲"
                : "Hide ▲"
              : language === "mr"
              ? "पहा / भरा ▼"
              : "Expand ▼"}
          </span>
        </button>

        {showCulturalFields && (
          <div className="mt-4 p-5 rounded-[var(--radius-card)] bg-[var(--surface)] border border-[var(--line)] space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-[var(--ink)] mb-1">
                  {t.register.fields.nativePlace}
                </label>
                <input
                  type="text"
                  placeholder={t.register.fields.nativePlacePlaceholder}
                  {...register("nativePlace" as any)}
                  className="w-full h-[46px] px-3.5 rounded-lg border border-[var(--line)] text-sm text-[var(--ink)] placeholder:text-[var(--ink-faint)] focus:border-[var(--accent)]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[var(--ink)] mb-1">
                  {t.register.fields.birthPlace}
                </label>
                <input
                  type="text"
                  placeholder={t.register.fields.birthPlacePlaceholder}
                  {...register("birthPlace" as any)}
                  className="w-full h-[46px] px-3.5 rounded-lg border border-[var(--line)] text-sm text-[var(--ink)] placeholder:text-[var(--ink-faint)] focus:border-[var(--accent)]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-[var(--ink)] mb-1">
                  {t.register.fields.birthTime}
                </label>
                <input
                  type="text"
                  placeholder={t.register.fields.birthTimePlaceholder}
                  {...register("birthTime" as any)}
                  className="w-full h-[46px] px-3.5 rounded-lg border border-[var(--line)] text-sm text-[var(--ink)] placeholder:text-[var(--ink-faint)] focus:border-[var(--accent)]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[var(--ink)] mb-1">
                  {t.register.fields.kuldaivat}
                </label>
                <input
                  type="text"
                  placeholder={t.register.fields.kuldaivatPlaceholder}
                  {...register("kuldaivat" as any)}
                  className="w-full h-[46px] px-3.5 rounded-lg border border-[var(--line)] text-sm text-[var(--ink)] placeholder:text-[var(--ink-faint)] focus:border-[var(--accent)]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-medium text-[var(--ink)] mb-1">
                  {t.register.fields.rashi}
                </label>
                <input
                  type="text"
                  placeholder={t.register.fields.rashiPlaceholder}
                  {...register("rashi" as any)}
                  className="w-full h-[46px] px-3.5 rounded-lg border border-[var(--line)] text-sm text-[var(--ink)] placeholder:text-[var(--ink-faint)] focus:border-[var(--accent)]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[var(--ink)] mb-1">
                  {t.register.fields.nakshatra}
                </label>
                <input
                  type="text"
                  placeholder={t.register.fields.nakshatraPlaceholder}
                  {...register("nakshatra" as any)}
                  className="w-full h-[46px] px-3.5 rounded-lg border border-[var(--line)] text-sm text-[var(--ink)] placeholder:text-[var(--ink-faint)] focus:border-[var(--accent)]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[var(--ink)] mb-1">
                  {t.register.fields.gotra}
                </label>
                <input
                  type="text"
                  placeholder={t.register.fields.gotraPlaceholder}
                  {...register("gotra" as any)}
                  className="w-full h-[46px] px-3.5 rounded-lg border border-[var(--line)] text-sm text-[var(--ink)] placeholder:text-[var(--ink-faint)] focus:border-[var(--accent)]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-[var(--ink)] mb-1">
                  {t.register.fields.caste}
                </label>
                <input
                  type="text"
                  placeholder={t.register.fields.castePlaceholder}
                  {...register("caste" as any)}
                  className="w-full h-[46px] px-3.5 rounded-lg border border-[var(--line)] text-sm text-[var(--ink)] placeholder:text-[var(--ink-faint)] focus:border-[var(--accent)]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[var(--ink)] mb-1">
                  {t.register.fields.subcaste}
                </label>
                <input
                  type="text"
                  placeholder={t.register.fields.subcastePlaceholder}
                  {...register("subcaste" as any)}
                  className="w-full h-[46px] px-3.5 rounded-lg border border-[var(--line)] text-sm text-[var(--ink)] placeholder:text-[var(--ink-faint)] focus:border-[var(--accent)]"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
