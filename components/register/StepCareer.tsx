"use client";

import { useFormContext } from "react-hook-form";
import { RegistrationFormData } from "@/lib/schemas/profile.schema";
import { EDUCATION_LEVELS, PROFESSIONS, INCOME_RANGES } from "@/lib/constants/options";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export function StepCareer() {
  const {
    register,
    formState: { errors },
  } = useFormContext<RegistrationFormData>();

  const { t, language } = useLanguage();

  return (
    <div className="space-y-6">
      {/* Highest Education */}
      <div>
        <label
          htmlFor="education"
          className="block text-sm font-medium text-[var(--ink)] mb-2"
        >
          {t.register.fields.education} <span className="text-[var(--accent)]">*</span>
        </label>
        <div className="relative">
          <input
            id="education"
            type="text"
            list="education-list"
            placeholder={t.register.fields.educationPlaceholder}
            {...register("education")}
            className={`w-full h-[52px] px-4 rounded-[var(--radius-card)] bg-[var(--surface)] border text-base text-[var(--ink)] placeholder:text-[var(--ink-faint)] focus:border-[var(--accent)] transition-colors ${
              errors.education
                ? "border-[var(--danger)]"
                : "border-[var(--line)]"
            }`}
          />
          <datalist id="education-list">
            {EDUCATION_LEVELS.map((edu) => (
              <option key={edu} value={edu} />
            ))}
          </datalist>
        </div>
        {errors.education && (
          <p className="text-xs text-[var(--danger)] mt-1.5">
            {errors.education.message}
          </p>
        )}
      </div>

      {/* College / Institution */}
      <div>
        <label
          htmlFor="institution"
          className="block text-sm font-medium text-[var(--ink)] mb-2"
        >
          {t.register.fields.institution}{" "}
          <span className="text-xs font-normal text-[var(--ink-muted)]">
            ({language === "mr" ? "ऐच्छिक" : "Optional"})
          </span>
        </label>
        <input
          id="institution"
          type="text"
          placeholder={t.register.fields.institutionPlaceholder}
          {...register("institution")}
          className="w-full h-[52px] px-4 rounded-[var(--radius-card)] bg-[var(--surface)] border border-[var(--line)] text-base text-[var(--ink)] placeholder:text-[var(--ink-faint)] focus:border-[var(--accent)] transition-colors"
        />
      </div>

      {/* Profession */}
      <div>
        <label
          htmlFor="profession"
          className="block text-sm font-medium text-[var(--ink)] mb-2"
        >
          {t.register.fields.profession} <span className="text-[var(--accent)]">*</span>
        </label>
        <div className="relative">
          <input
            id="profession"
            type="text"
            list="profession-list"
            placeholder={t.register.fields.professionPlaceholder}
            {...register("profession")}
            className={`w-full h-[52px] px-4 rounded-[var(--radius-card)] bg-[var(--surface)] border text-base text-[var(--ink)] placeholder:text-[var(--ink-faint)] focus:border-[var(--accent)] transition-colors ${
              errors.profession
                ? "border-[var(--danger)]"
                : "border-[var(--line)]"
            }`}
          />
          <datalist id="profession-list">
            {PROFESSIONS.map((prof) => (
              <option key={prof} value={prof} />
            ))}
          </datalist>
        </div>
        {errors.profession && (
          <p className="text-xs text-[var(--danger)] mt-1.5">
            {errors.profession.message}
          </p>
        )}
      </div>

      {/* Company / Business */}
      <div>
        <label
          htmlFor="company"
          className="block text-sm font-medium text-[var(--ink)] mb-2"
        >
          {t.register.fields.company}{" "}
          <span className="text-xs font-normal text-[var(--ink-muted)]">
            ({language === "mr" ? "ऐच्छिक" : "Optional"})
          </span>
        </label>
        <input
          id="company"
          type="text"
          placeholder={t.register.fields.companyPlaceholder}
          {...register("company")}
          className="w-full h-[52px] px-4 rounded-[var(--radius-card)] bg-[var(--surface)] border border-[var(--line)] text-base text-[var(--ink)] placeholder:text-[var(--ink-faint)] focus:border-[var(--accent)] transition-colors"
        />
      </div>

      {/* Annual Income */}
      <div>
        <label
          htmlFor="income"
          className="block text-sm font-medium text-[var(--ink)] mb-2"
        >
          {t.register.fields.income}{" "}
          <span className="text-xs font-normal text-[var(--ink-muted)]">
            ({language === "mr" ? "ऐच्छिक" : "Optional"})
          </span>
        </label>
        <select
          id="income"
          {...register("income")}
          className="w-full h-[52px] px-4 rounded-[var(--radius-card)] bg-[var(--surface)] border border-[var(--line)] text-base text-[var(--ink)] focus:border-[var(--accent)] transition-colors"
        >
          <option value="">
            {language === "mr" ? "वार्षिक उत्पन्न श्रेणी निवडा" : "Select income range"}
          </option>
          {INCOME_RANGES.map((inc) => (
            <option key={inc} value={inc}>
              {inc}
            </option>
          ))}
        </select>
        <p className="text-xs text-[var(--ink-muted)] mt-1">
          {language === "mr"
            ? "उत्पन्नाची माहिती पूर्णपणे खाजगी ठेवली जाते. सार्वजनिकरित्या उघड केली जात नाही."
            : "Stored with strict confidentiality; never shown in public summaries."}
        </p>
      </div>
    </div>
  );
}
