"use client";

import { useFormContext } from "react-hook-form";
import { RegistrationFormData } from "@/lib/schemas/profile.schema";
import { calculateAge, formatIndianPhone } from "@/lib/utils";
import { useLanguage } from "@/lib/i18n/LanguageContext";

interface StepReviewProps {
  onJumpToStep: (stepNumber: number) => void;
}

export function StepReview({ onJumpToStep }: StepReviewProps) {
  const {
    watch,
    register,
    formState: { errors },
  } = useFormContext<RegistrationFormData>();

  const { t, language } = useLanguage();
  const values = watch();
  const age = values.dateOfBirth ? calculateAge(values.dateOfBirth) : 0;

  return (
    <div className="space-y-8">
      <div className="bg-[var(--surface-2)]/60 border border-[var(--line)] rounded-[var(--radius-card)] p-4 text-xs text-[var(--ink-muted)]">
        {t.register.fields.reviewSubtitle}
      </div>

      {/* Section 1: Basics */}
      <div className="bg-[var(--surface)] border border-[var(--line)] rounded-[var(--radius-card)] p-5 sm:p-6">
        <div className="flex items-center justify-between border-b border-[var(--line)] pb-3 mb-4">
          <span className="eyebrow text-[var(--accent)] font-semibold">
            {language === "mr" ? "०१ — वैयक्तिक माहिती" : "01 — BASIC PARTICULARS"}
          </span>
          <button
            type="button"
            onClick={() => onJumpToStep(1)}
            className="text-xs font-semibold text-[var(--accent)] hover:underline cursor-pointer"
          >
            {language === "mr" ? "बदला (Edit)" : "Edit"}
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-xs text-[var(--ink-muted)] block">
              {t.register.fields.fullName}
            </span>
            <span className="font-medium text-[var(--ink)]">
              {values.fullName || "—"}
            </span>
          </div>
          <div>
            <span className="text-xs text-[var(--ink-muted)] block">
              {t.register.fields.gender} &amp; {t.register.fields.age}
            </span>
            <span className="font-medium text-[var(--ink)]">
              {values.gender || "—"} &bull; {age} {t.register.fields.yearsOld} ({values.dateOfBirth || "—"})
            </span>
          </div>
          <div>
            <span className="text-xs text-[var(--ink-muted)] block">
              {t.register.fields.location}
            </span>
            <span className="font-medium text-[var(--ink)]">
              {values.location || "—"}
            </span>
          </div>
          <div>
            <span className="text-xs text-[var(--ink-muted)] block">
              {t.register.fields.maritalStatus}
            </span>
            <span className="font-medium text-[var(--ink)]">
              {values.maritalStatus || "—"}
            </span>
          </div>
          <div>
            <span className="text-xs text-[var(--ink-muted)] block">
              {t.register.fields.phone}
            </span>
            <span className="font-medium text-[var(--ink)] tabular-nums">
              {values.phone ? formatIndianPhone(values.phone) : "—"}
            </span>
          </div>
          <div>
            <span className="text-xs text-[var(--ink-muted)] block">
              {t.register.fields.email}
            </span>
            <span className="font-medium text-[var(--ink)]">
              {values.email || "—"}
            </span>
          </div>
        </div>
      </div>

      {/* Section 2: Education & Career */}
      <div className="bg-[var(--surface)] border border-[var(--line)] rounded-[var(--radius-card)] p-5 sm:p-6">
        <div className="flex items-center justify-between border-b border-[var(--line)] pb-3 mb-4">
          <span className="eyebrow text-[var(--accent)] font-semibold">
            {language === "mr" ? "०२ — शिक्षण आणि व्यवसाय" : "02 — EDUCATION & CAREER"}
          </span>
          <button
            type="button"
            onClick={() => onJumpToStep(2)}
            className="text-xs font-semibold text-[var(--accent)] hover:underline cursor-pointer"
          >
            {language === "mr" ? "बदला (Edit)" : "Edit"}
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-xs text-[var(--ink-muted)] block">
              {t.register.fields.education}
            </span>
            <span className="font-medium text-[var(--ink)]">
              {values.education || "—"}
            </span>
          </div>
          <div>
            <span className="text-xs text-[var(--ink-muted)] block">
              {t.register.fields.institution}
            </span>
            <span className="font-medium text-[var(--ink)]">
              {values.institution || "—"}
            </span>
          </div>
          <div>
            <span className="text-xs text-[var(--ink-muted)] block">
              {t.register.fields.profession}
            </span>
            <span className="font-medium text-[var(--ink)]">
              {values.profession || "—"}
            </span>
          </div>
          <div>
            <span className="text-xs text-[var(--ink-muted)] block">
              {t.register.fields.company}
            </span>
            <span className="font-medium text-[var(--ink)]">
              {values.company || "—"}
            </span>
          </div>
          <div>
            <span className="text-xs text-[var(--ink-muted)] block">
              {t.register.fields.income}
            </span>
            <span className="font-medium text-[var(--ink)]">
              {values.income || "—"}
            </span>
          </div>
        </div>
      </div>

      {/* Section 3: Family & Cultural Details */}
      <div className="bg-[var(--surface)] border border-[var(--line)] rounded-[var(--radius-card)] p-5 sm:p-6">
        <div className="flex items-center justify-between border-b border-[var(--line)] pb-3 mb-4">
          <span className="eyebrow text-[var(--accent)] font-semibold">
            {language === "mr" ? "०३ — कुटुंबाची माहिती" : "03 — FAMILY BACKGROUND"}
          </span>
          <button
            type="button"
            onClick={() => onJumpToStep(3)}
            className="text-xs font-semibold text-[var(--accent)] hover:underline cursor-pointer"
          >
            {language === "mr" ? "बदला (Edit)" : "Edit"}
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-xs text-[var(--ink-muted)] block">
              {t.register.fields.fatherName}
            </span>
            <span className="font-medium text-[var(--ink)]">
              {values.fatherName || "—"}
            </span>
          </div>
          <div>
            <span className="text-xs text-[var(--ink-muted)] block">
              {t.register.fields.motherName}
            </span>
            <span className="font-medium text-[var(--ink)]">
              {values.motherName || "—"}
            </span>
          </div>
          <div>
            <span className="text-xs text-[var(--ink-muted)] block">
              {t.register.fields.familyBackground}
            </span>
            <span className="font-medium text-[var(--ink)]">
              {values.familyBackground || "—"}
            </span>
          </div>
          <div>
            <span className="text-xs text-[var(--ink-muted)] block">
              {t.register.fields.familyLocation}
            </span>
            <span className="font-medium text-[var(--ink)]">
              {values.familyLocation || "—"}
            </span>
          </div>
          <div className="sm:col-span-2">
            <span className="text-xs text-[var(--ink-muted)] block">
              {t.register.fields.siblings}
            </span>
            <span className="font-medium text-[var(--ink)]">
              {values.siblings || "—"}
            </span>
          </div>

          {/* Show cultural details if provided */}
          {((values as any).nativePlace ||
            (values as any).kuldaivat ||
            (values as any).rashi ||
            (values as any).caste) && (
            <div className="sm:col-span-2 pt-3 border-t border-[var(--line)] grid grid-cols-2 gap-2 text-xs">
              {(values as any).nativePlace && (
                <div>
                  <span className="text-[var(--ink-muted)] block">
                    {t.register.fields.nativePlace}:
                  </span>
                  <span className="font-medium text-[var(--ink)]">
                    {(values as any).nativePlace}
                  </span>
                </div>
              )}
              {(values as any).kuldaivat && (
                <div>
                  <span className="text-[var(--ink-muted)] block">
                    {t.register.fields.kuldaivat}:
                  </span>
                  <span className="font-medium text-[var(--ink)]">
                    {(values as any).kuldaivat}
                  </span>
                </div>
              )}
              {(values as any).rashi && (
                <div>
                  <span className="text-[var(--ink-muted)] block">
                    {t.register.fields.rashi}:
                  </span>
                  <span className="font-medium text-[var(--ink)]">
                    {(values as any).rashi}
                  </span>
                </div>
              )}
              {(values as any).caste && (
                <div>
                  <span className="text-[var(--ink-muted)] block">
                    {t.register.fields.caste}:
                  </span>
                  <span className="font-medium text-[var(--ink)]">
                    {(values as any).caste}
                  </span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Section 4: Preferences & Lifestyle */}
      <div className="bg-[var(--surface)] border border-[var(--line)] rounded-[var(--radius-card)] p-5 sm:p-6">
        <div className="flex items-center justify-between border-b border-[var(--line)] pb-3 mb-4">
          <span className="eyebrow text-[var(--accent)] font-semibold">
            {language === "mr" ? "०४ — जीवनसाथीविषयी अपेक्षा" : "04 — LIFESTYLE & PREFERENCES"}
          </span>
          <button
            type="button"
            onClick={() => onJumpToStep(4)}
            className="text-xs font-semibold text-[var(--accent)] hover:underline cursor-pointer"
          >
            {language === "mr" ? "बदला (Edit)" : "Edit"}
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-xs text-[var(--ink-muted)] block">
              {t.register.fields.height}
            </span>
            <span className="font-medium text-[var(--ink)]">
              {values.height || "—"}
            </span>
          </div>
          <div>
            <span className="text-xs text-[var(--ink-muted)] block">
              {t.register.fields.diet}
            </span>
            <span className="font-medium text-[var(--ink)]">
              {values.diet || "—"}
            </span>
          </div>
          <div className="sm:col-span-2">
            <span className="text-xs text-[var(--ink-muted)] block">
              {t.register.fields.hobbies}
            </span>
            <span className="font-medium text-[var(--ink)]">
              {values.hobbies && values.hobbies.length > 0
                ? values.hobbies.join(", ")
                : "—"}
            </span>
          </div>
          <div className="sm:col-span-2">
            <span className="text-xs text-[var(--ink-muted)] block">
              {t.register.fields.prefAgeRange}
            </span>
            <span className="font-medium text-[var(--ink)] tabular-nums">
              {values.partnerPreferences?.ageMin ?? 24} –{" "}
              {values.partnerPreferences?.ageMax ?? 32} {t.register.fields.yearsOld}
            </span>
          </div>
          {values.about && (
            <div className="sm:col-span-2">
              <span className="text-xs text-[var(--ink-muted)] block">
                {t.register.fields.about}
              </span>
              <p className="text-xs sm:text-sm text-[var(--ink)] mt-1 italic">
                &ldquo;{values.about}&rdquo;
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Section 5: Documents */}
      <div className="bg-[var(--surface)] border border-[var(--line)] rounded-[var(--radius-card)] p-5 sm:p-6">
        <div className="flex items-center justify-between border-b border-[var(--line)] pb-3 mb-4">
          <span className="eyebrow text-[var(--accent)] font-semibold">
            {language === "mr" ? "०५ — फोटो आणि बायोडाटा" : "05 — ATTACHED DOCUMENTS"}
          </span>
          <button
            type="button"
            onClick={() => onJumpToStep(5)}
            className="text-xs font-semibold text-[var(--accent)] hover:underline cursor-pointer"
          >
            {language === "mr" ? "बदला (Edit)" : "Edit"}
          </button>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 text-sm">
          <div className="flex items-center gap-2">
            <span
              className={`w-2 h-2 rounded-full ${
                values.photoUrl ? "bg-[var(--success)]" : "bg-[var(--ink-faint)]"
              }`}
            />
            <span className="text-[var(--ink)]">
              {values.photoUrl
                ? language === "mr"
                  ? "फोटो जोडला आहे"
                  : "Photograph Attached"
                : language === "mr"
                ? "फोटो जोडलेला नाही"
                : "No Photo Attached"}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span
              className={`w-2 h-2 rounded-full ${
                values.biodataUrl ? "bg-[var(--success)]" : "bg-[var(--ink-faint)]"
              }`}
            />
            <span className="text-[var(--ink)]">
              {values.biodataUrl
                ? language === "mr"
                  ? "बायोडाटा फाईल जोडली आहे"
                  : "Biodata PDF Attached"
                : language === "mr"
                ? "बायोडाटा फाईल जोडलेली नाही"
                : "No Biodata PDF Attached"}
            </span>
          </div>
        </div>
      </div>

      {/* Required Consent Checkbox */}
      <div className="pt-2">
        <label className="flex items-start gap-3 p-4 rounded-[var(--radius-card)] border border-[var(--line)] bg-[var(--surface)] cursor-pointer hover:border-[var(--ink-muted)] transition-colors">
          <input
            type="checkbox"
            {...register("consent")}
            className="w-5 h-5 rounded border-[var(--line)] text-[var(--accent)] focus:ring-[var(--accent)] mt-0.5"
          />
          <span className="text-xs sm:text-sm leading-relaxed text-[var(--ink)]">
            {t.register.fields.termsConsent}{" "}
            <a
              href="/privacy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--accent)] underline hover:text-[var(--accent-hover)] font-medium"
            >
              ({t.footer.privacyPolicy})
            </a>
          </span>
        </label>
        {errors.consent && (
          <p className="text-xs text-[var(--danger)] mt-2">
            {errors.consent.message}
          </p>
        )}
      </div>
    </div>
  );
}
