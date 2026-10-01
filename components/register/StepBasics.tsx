"use client";

import { useFormContext } from "react-hook-form";
import { RegistrationFormData } from "@/lib/schemas/profile.schema";
import { calculateAge } from "@/lib/utils";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { MAHARASHTRA_CITIES_LIST } from "@/lib/constants/locations";

export function StepBasics() {
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<RegistrationFormData>();

  const { t, language } = useLanguage();

  const selectedGender = watch("gender");
  const selectedDob = watch("dateOfBirth");
  const age = selectedDob ? calculateAge(selectedDob) : null;

  const genderOptions = [
    { value: "Female" as const, label: t.register.fields.female },
    { value: "Male" as const, label: t.register.fields.male },
    { value: "Other" as const, label: t.register.fields.other },
  ];

  const maritalOptions = [
    { value: "Never Married" as const, label: t.register.fields.neverMarried },
    { value: "Divorced" as const, label: t.register.fields.divorced },
    { value: "Widowed" as const, label: t.register.fields.widowed },
    { value: "Separated" as const, label: t.register.fields.separated },
  ];

  return (
    <div className="space-y-6">
      {/* Full Name */}
      <div>
        <label
          htmlFor="fullName"
          className="block text-sm font-medium text-[var(--ink)] mb-2"
        >
          {t.register.fields.fullName} <span className="text-[var(--accent)]">*</span>
        </label>
        <input
          id="fullName"
          type="text"
          autoComplete="name"
          placeholder={t.register.fields.fullNamePlaceholder}
          {...register("fullName")}
          className={`w-full h-[52px] px-4 rounded-[var(--radius-card)] bg-[var(--surface)] border text-base text-[var(--ink)] placeholder:text-[var(--ink-faint)] focus:border-[var(--accent)] transition-colors ${
            errors.fullName
              ? "border-[var(--danger)]"
              : "border-[var(--line)]"
          }`}
        />
        {errors.fullName && (
          <p className="text-xs text-[var(--danger)] mt-1.5">
            {errors.fullName.message}
          </p>
        )}
      </div>

      {/* Gender Tile Selector */}
      <div>
        <label className="block text-sm font-medium text-[var(--ink)] mb-2">
          {t.register.fields.gender} <span className="text-[var(--accent)]">*</span>
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {genderOptions.map((opt) => {
            const isSelected = selectedGender === opt.value;
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() =>
                  setValue("gender", opt.value, { shouldValidate: true })
                }
                className={`h-[52px] px-3 rounded-[var(--radius-card)] border text-sm sm:text-base font-medium transition-all flex items-center justify-center cursor-pointer ${
                  isSelected
                    ? "bg-[var(--accent-soft)] border-[var(--accent)] text-[var(--accent)] ring-1 ring-[var(--accent)]"
                    : "bg-[var(--surface)] border-[var(--line)] text-[var(--ink)] hover:border-[var(--ink-muted)]"
                }`}
              >
                {opt.label}
              </button>
            );
          })}
        </div>
        {errors.gender && (
          <p className="text-xs text-[var(--danger)] mt-1.5">
            {errors.gender.message}
          </p>
        )}
      </div>

      {/* Date of Birth & Live Age */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label
            htmlFor="dateOfBirth"
            className="text-sm font-medium text-[var(--ink)]"
          >
            {t.register.fields.dob} <span className="text-[var(--accent)]">*</span>
          </label>
          {age !== null && age > 0 && (
            <span className="text-xs font-semibold text-[var(--accent)] bg-[var(--accent-soft)] px-2.5 py-0.5 rounded-full tabular-nums">
              {t.register.fields.age}: {age} {t.register.fields.yearsOld}
            </span>
          )}
        </div>
        <input
          id="dateOfBirth"
          type="date"
          autoComplete="bday"
          max={
            new Date(new Date().setFullYear(new Date().getFullYear() - 18))
              .toISOString()
              .split("T")[0]
          }
          {...register("dateOfBirth")}
          className={`w-full h-[52px] px-4 rounded-[var(--radius-card)] bg-[var(--surface)] border text-base text-[var(--ink)] focus:border-[var(--accent)] transition-colors ${
            errors.dateOfBirth
              ? "border-[var(--danger)]"
              : "border-[var(--line)]"
          }`}
        />
        {errors.dateOfBirth ? (
          <p className="text-xs text-[var(--danger)] mt-1.5">
            {errors.dateOfBirth.message}
          </p>
        ) : (
          <p className="text-xs text-[var(--ink-muted)] mt-1">
            {language === "mr"
              ? "नोंदणीसाठी उमेदवाराचे वय किमान १८ वर्षे असणे आवश्यक आहे."
              : "Candidate must be at least 18 years old to submit a profile."}
          </p>
        )}
      </div>

      {/* Current Location */}
      <div>
        <label
          htmlFor="location"
          className="block text-sm font-medium text-[var(--ink)] mb-2"
        >
          {t.register.fields.location}{" "}
          <span className="text-[var(--accent)]">*</span>
        </label>
        <div className="relative">
          <input
            id="location"
            type="text"
            list="maharashtra-cities"
            placeholder={
              language === "mr" ? "उदा. पुणे, महाराष्ट्र" : "e.g. Pune, Maharashtra"
            }
            {...register("location")}
            className={`w-full h-[52px] px-4 rounded-[var(--radius-card)] bg-[var(--surface)] border text-base text-[var(--ink)] placeholder:text-[var(--ink-faint)] focus:border-[var(--accent)] transition-colors ${
              errors.location
                ? "border-[var(--danger)]"
                : "border-[var(--line)]"
            }`}
          />
          <datalist id="maharashtra-cities">
            {MAHARASHTRA_CITIES_LIST.map((city) => (
              <option key={city} value={city} />
            ))}
          </datalist>
        </div>
        {errors.location && (
          <p className="text-xs text-[var(--danger)] mt-1.5">
            {errors.location.message}
          </p>
        )}
      </div>

      {/* Contact Number (Indian +91) */}
      <div>
        <label
          htmlFor="phone"
          className="block text-sm font-medium text-[var(--ink)] mb-2"
        >
          {t.register.fields.phone} <span className="text-[var(--accent)]">*</span>
        </label>
        <div className="flex rounded-[var(--radius-card)] border border-[var(--line)] overflow-hidden focus-within:border-[var(--accent)] transition-colors">
          <span className="h-[52px] px-4 bg-[var(--surface-2)] text-sm font-medium text-[var(--ink-muted)] flex items-center border-r border-[var(--line)]">
            +91
          </span>
          <input
            id="phone"
            type="tel"
            inputMode="numeric"
            autoComplete="tel-national"
            maxLength={10}
            placeholder={t.register.fields.phonePlaceholder}
            {...register("phone")}
            className="flex-1 h-[52px] px-4 bg-[var(--surface)] text-base text-[var(--ink)] placeholder:text-[var(--ink-faint)] focus:outline-none"
          />
        </div>
        {errors.phone ? (
          <p className="text-xs text-[var(--danger)] mt-1.5">
            {errors.phone.message}
          </p>
        ) : (
          <p className="text-xs text-[var(--ink-muted)] mt-1">
            {language === "mr"
              ? "केवळ मॅचमेकरच्या अधिकृत संवादासाठीच वापरला जातो. इतर कोणासही दाखवला जात नाही."
              : "Used strictly for private matchmaker correspondence."}
          </p>
        )}
      </div>

      {/* Email Address (Optional) */}
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-[var(--ink)] mb-2"
        >
          {t.register.fields.email}{" "}
          <span className="text-xs font-normal text-[var(--ink-muted)]">
            ({language === "mr" ? "ऐच्छिक" : "Optional"})
          </span>
        </label>
        <input
          id="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          placeholder={t.register.fields.emailPlaceholder}
          {...register("email")}
          className={`w-full h-[52px] px-4 rounded-[var(--radius-card)] bg-[var(--surface)] border text-base text-[var(--ink)] placeholder:text-[var(--ink-faint)] focus:border-[var(--accent)] transition-colors ${
            errors.email ? "border-[var(--danger)]" : "border-[var(--line)]"
          }`}
        />
        {errors.email && (
          <p className="text-xs text-[var(--danger)] mt-1.5">
            {errors.email.message}
          </p>
        )}
      </div>

      {/* Marital Status */}
      <div>
        <label
          htmlFor="maritalStatus"
          className="block text-sm font-medium text-[var(--ink)] mb-2"
        >
          {t.register.fields.maritalStatus} <span className="text-[var(--accent)]">*</span>
        </label>
        <select
          id="maritalStatus"
          {...register("maritalStatus")}
          className={`w-full h-[52px] px-4 rounded-[var(--radius-card)] bg-[var(--surface)] border text-base text-[var(--ink)] focus:border-[var(--accent)] transition-colors ${
            errors.maritalStatus
              ? "border-[var(--danger)]"
              : "border-[var(--line)]"
          }`}
        >
          <option value="">
            {language === "mr" ? "वैवाहिक स्थिती निवडा" : "Select marital status"}
          </option>
          {maritalOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        {errors.maritalStatus && (
          <p className="text-xs text-[var(--danger)] mt-1.5">
            {errors.maritalStatus.message}
          </p>
        )}
      </div>
    </div>
  );
}
