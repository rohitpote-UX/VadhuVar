"use client";

import { useFormContext } from "react-hook-form";
import { RegistrationFormData } from "@/lib/schemas/profile.schema";
import { FileDropzone } from "./FileDropzone";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export function StepMedia() {
  const { setValue, watch } = useFormContext<RegistrationFormData>();
  const { t, language } = useLanguage();

  const photoUrl = watch("photoUrl");
  const biodataUrl = watch("biodataUrl");
  const biodataFileName = watch("biodataFileName");

  return (
    <div className="space-y-8">
      {/* Privacy Guarantee Banner */}
      <div className="bg-[var(--surface)] border border-[var(--line)] rounded-[var(--radius-card)] p-4 sm:p-5 flex items-start gap-3.5 shadow-sm">
        <div className="w-8 h-8 rounded-full bg-[var(--surface-2)] flex items-center justify-center text-[var(--accent)] flex-shrink-0 mt-0.5">
          <svg
            className="w-4 h-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-medium text-[var(--ink)]">
            {language === "mr" ? "१००% सुरक्षित व गोपनीय साठवणूक" : "Guaranteed Confidential Storage"}
          </span>
          <span className="text-xs text-[var(--ink-muted)] leading-relaxed mt-0.5">
            {language === "mr"
              ? "आपले छायाचित्र आणि बायोडाटा आमच्या सुरक्षित सर्व्हरवर सुरक्षित राहतात. ते कोणत्याही सार्वजनिक संकेतस्थळावर दाखवले जात नाहीत आणि फक्त आपल्या संमतीनेच पाहिले जातात."
              : "Your photograph and biodata are kept in our encrypted vault. They are never visible on the open internet, never indexed by search engines, and shared strictly with your consent."}
          </span>
        </div>
      </div>

      {/* Profile Photo Upload */}
      <FileDropzone
        accept="image/jpeg,image/png,image/webp"
        maxSizeBytes={5 * 1024 * 1024}
        label={`${t.register.fields.photoUploadTitle} (${language === "mr" ? "ऐच्छिक" : "Optional"})`}
        helperText={t.register.fields.photoUploadDesc}
        valueUrl={photoUrl}
        onChange={(url) => setValue("photoUrl", url, { shouldValidate: true })}
        onRemove={() => setValue("photoUrl", "", { shouldValidate: true })}
      />

      {/* Biodata PDF Upload */}
      <FileDropzone
        accept="application/pdf"
        maxSizeBytes={5 * 1024 * 1024}
        isPdf={true}
        label={`${t.register.fields.biodataUploadTitle} (${language === "mr" ? "ऐच्छिक" : "Optional"})`}
        helperText={t.register.fields.biodataUploadDesc}
        valueUrl={biodataUrl}
        valueFileName={biodataFileName}
        onChange={(url, fileName) => {
          setValue("biodataUrl", url, { shouldValidate: true });
          setValue("biodataFileName", fileName, { shouldValidate: true });
        }}
        onRemove={() => {
          setValue("biodataUrl", "", { shouldValidate: true });
          setValue("biodataFileName", "", { shouldValidate: true });
        }}
      />
    </div>
  );
}
