"use client";

import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { RegistrationFormData } from "@/lib/schemas/profile.schema";
import { HEIGHTS, POPULAR_HOBBIES } from "@/lib/constants/options";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export function StepPreferences() {
  const { register, watch, setValue } = useFormContext<RegistrationFormData>();
  const { t, language } = useLanguage();

  const currentHobbies = watch("hobbies") || [];
  const aboutText = watch("about") || "";
  const [hobbyInput, setHobbyInput] = useState("");

  const addHobby = (hobby: string) => {
    const trimmed = hobby.trim();
    if (!trimmed || currentHobbies.includes(trimmed) || currentHobbies.length >= 8) {
      return;
    }
    setValue("hobbies", [...currentHobbies, trimmed], { shouldValidate: true });
    setHobbyInput("");
  };

  const removeHobby = (index: number) => {
    setValue(
      "hobbies",
      currentHobbies.filter((_, i) => i !== index),
      { shouldValidate: true }
    );
  };

  const dietOptions = [
    { value: "Vegetarian" as const, label: t.register.fields.vegetarian },
    { value: "Non-vegetarian" as const, label: t.register.fields.nonVegetarian },
    { value: "Eggetarian" as const, label: t.register.fields.eggetarian },
  ];

  const habitOptions = [
    { value: "No" as const, label: t.register.fields.habitsNo },
    { value: "Yes" as const, label: t.register.fields.habitsYes },
    { value: "Occasionally" as const, label: t.register.fields.habitsOccasionally },
  ];

  return (
    <div className="space-y-8">
      {/* Personal Section */}
      <div className="space-y-6">
        <h3 className="font-serif text-xl text-[var(--ink)] font-normal border-b border-[var(--line)] pb-3">
          {language === "mr" ? "जीवनशैली आणि वैयक्तिक माहिती" : "Personal Lifestyle & Traits"}
        </h3>

        {/* Height */}
        <div>
          <label
            htmlFor="height"
            className="block text-sm font-medium text-[var(--ink)] mb-2"
          >
            {t.register.fields.height}
          </label>
          <select
            id="height"
            {...register("height")}
            className="w-full h-[52px] px-4 rounded-[var(--radius-card)] bg-[var(--surface)] border border-[var(--line)] text-base text-[var(--ink)] focus:border-[var(--accent)] transition-colors"
          >
            <option value="">
              {language === "mr" ? "उंची निवडा" : "Select height"}
            </option>
            {HEIGHTS.map((h) => (
              <option key={h} value={h}>
                {h}
              </option>
            ))}
          </select>
        </div>

        {/* Diet */}
        <div>
          <label className="block text-sm font-medium text-[var(--ink)] mb-2">
            {t.register.fields.diet}
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {dietOptions.map((diet) => {
              const isSelected = watch("diet") === diet.value;
              return (
                <button
                  key={diet.value}
                  type="button"
                  onClick={() => setValue("diet", diet.value)}
                  className={`h-12 rounded-[var(--radius-card)] border text-sm font-medium transition-all cursor-pointer ${
                    isSelected
                      ? "bg-[var(--accent-soft)] border-[var(--accent)] text-[var(--accent)]"
                      : "bg-[var(--surface)] border-[var(--line)] text-[var(--ink)] hover:border-[var(--ink-muted)]"
                  }`}
                >
                  {diet.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Smoking & Drinking */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="smoking"
              className="block text-sm font-medium text-[var(--ink)] mb-2"
            >
              {t.register.fields.smoking}
            </label>
            <select
              id="smoking"
              {...register("smoking")}
              className="w-full h-12 px-4 rounded-[var(--radius-card)] bg-[var(--surface)] border border-[var(--line)] text-sm text-[var(--ink)] focus:border-[var(--accent)] transition-colors"
            >
              <option value="">
                {language === "mr" ? "निवडा" : "Select habit"}
              </option>
              {habitOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="drinking"
              className="block text-sm font-medium text-[var(--ink)] mb-2"
            >
              {t.register.fields.drinking}
            </label>
            <select
              id="drinking"
              {...register("drinking")}
              className="w-full h-12 px-4 rounded-[var(--radius-card)] bg-[var(--surface)] border border-[var(--line)] text-sm text-[var(--ink)] focus:border-[var(--accent)] transition-colors"
            >
              <option value="">
                {language === "mr" ? "निवडा" : "Select habit"}
              </option>
              {habitOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Hobbies / Interests (Tag style, max 8) */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label
              htmlFor="hobbiesInput"
              className="text-sm font-medium text-[var(--ink)]"
            >
              {t.register.fields.hobbies}
            </label>
            <span className="text-xs text-[var(--ink-muted)]">
              {currentHobbies.length} / 8 {language === "mr" ? "निवडले" : "selected"}
            </span>
          </div>

          <div className="flex gap-2 mb-3">
            <input
              id="hobbiesInput"
              type="text"
              value={hobbyInput}
              onChange={(e) => setHobbyInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addHobby(hobbyInput);
                }
              }}
              placeholder={t.register.fields.hobbiesPlaceholder}
              className="flex-1 h-12 px-4 rounded-[var(--radius-card)] bg-[var(--surface)] border border-[var(--line)] text-sm text-[var(--ink)] placeholder:text-[var(--ink-faint)] focus:border-[var(--accent)]"
            />
            <button
              type="button"
              onClick={() => addHobby(hobbyInput)}
              disabled={!hobbyInput.trim() || currentHobbies.length >= 8}
              className="px-4 h-12 rounded-[var(--radius-card)] bg-[var(--surface-2)] hover:bg-[var(--line)] text-sm font-medium text-[var(--ink)] disabled:opacity-40 transition-colors cursor-pointer"
            >
              {language === "mr" ? "जोडा" : "Add"}
            </button>
          </div>

          {/* Suggested tags */}
          <div className="flex flex-wrap gap-1.5 mb-3">
            {POPULAR_HOBBIES.filter((h) => !currentHobbies.includes(h))
              .slice(0, 6)
              .map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => addHobby(tag)}
                  disabled={currentHobbies.length >= 8}
                  className="text-xs px-2.5 py-1 rounded-full bg-[var(--surface-2)] text-[var(--ink-muted)] hover:text-[var(--ink)] transition-colors cursor-pointer"
                >
                  + {tag}
                </button>
              ))}
          </div>

          {/* Active chips */}
          {currentHobbies.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-1">
              {currentHobbies.map((hobby, index) => (
                <span
                  key={hobby}
                  className="inline-flex items-center gap-1.5 text-xs font-medium bg-[var(--accent-soft)] text-[var(--accent)] px-3 py-1.5 rounded-full"
                >
                  {hobby}
                  <button
                    type="button"
                    onClick={() => removeHobby(index)}
                    className="hover:opacity-75 focus-visible:outline-none cursor-pointer"
                    aria-label={`Remove ${hobby}`}
                  >
                    &times;
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>

        {/* About Me (Textarea + 600 Char Counter) */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label
              htmlFor="about"
              className="text-sm font-medium text-[var(--ink)]"
            >
              {t.register.fields.about}
            </label>
            <span
              className={`text-xs tabular-nums ${
                aboutText.length > 550
                  ? "text-[var(--warning)] font-medium"
                  : "text-[var(--ink-muted)]"
              }`}
            >
              {aboutText.length} / 600
            </span>
          </div>
          <textarea
            id="about"
            rows={4}
            maxLength={600}
            placeholder={t.register.fields.aboutPlaceholder}
            {...register("about")}
            className="w-full p-4 rounded-[var(--radius-card)] bg-[var(--surface)] border border-[var(--line)] text-base text-[var(--ink)] placeholder:text-[var(--ink-faint)] focus:border-[var(--accent)] transition-colors leading-relaxed resize-none"
          />
        </div>
      </div>

      {/* Partner Preferences Section */}
      <div className="space-y-6 pt-4">
        <h3 className="font-serif text-xl text-[var(--ink)] font-normal border-b border-[var(--line)] pb-3">
          {t.register.steps.step4}
        </h3>

        {/* Preferred Age Range */}
        <div>
          <label className="block text-sm font-medium text-[var(--ink)] mb-2">
            {t.register.fields.prefAgeRange}
          </label>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <span className="text-xs text-[var(--ink-muted)] mb-1 block">
                {t.register.fields.minAge}
              </span>
              <input
                type="number"
                min={18}
                max={70}
                {...register("partnerPreferences.ageMin", {
                  valueAsNumber: true,
                })}
                className="w-full h-12 px-4 rounded-[var(--radius-card)] bg-[var(--surface)] border border-[var(--line)] text-base text-[var(--ink)] tabular-nums"
              />
            </div>
            <div>
              <span className="text-xs text-[var(--ink-muted)] mb-1 block">
                {t.register.fields.maxAge}
              </span>
              <input
                type="number"
                min={18}
                max={70}
                {...register("partnerPreferences.ageMax", {
                  valueAsNumber: true,
                })}
                className="w-full h-12 px-4 rounded-[var(--radius-card)] bg-[var(--surface)] border border-[var(--line)] text-base text-[var(--ink)] tabular-nums"
              />
            </div>
          </div>
        </div>

        {/* Preferred Location */}
        <div>
          <label
            htmlFor="prefLocation"
            className="block text-sm font-medium text-[var(--ink)] mb-2"
          >
            {t.register.fields.prefLocation}
          </label>
          <input
            id="prefLocation"
            type="text"
            placeholder={t.register.fields.prefLocationPlaceholder}
            {...register("partnerPreferences.location")}
            className="w-full h-[52px] px-4 rounded-[var(--radius-card)] bg-[var(--surface)] border border-[var(--line)] text-base text-[var(--ink)] placeholder:text-[var(--ink-faint)] focus:border-[var(--accent)] transition-colors"
          />
        </div>

        {/* Preferred Education / Profession */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="prefEducation"
              className="block text-sm font-medium text-[var(--ink)] mb-2"
            >
              {t.register.fields.prefEducation}
            </label>
            <input
              id="prefEducation"
              type="text"
              placeholder={t.register.fields.prefEducationPlaceholder}
              {...register("partnerPreferences.education")}
              className="w-full h-12 px-4 rounded-[var(--radius-card)] bg-[var(--surface)] border border-[var(--line)] text-sm text-[var(--ink)] placeholder:text-[var(--ink-faint)] focus:border-[var(--accent)]"
            />
          </div>

          <div>
            <label
              htmlFor="prefProfession"
              className="block text-sm font-medium text-[var(--ink)] mb-2"
            >
              {t.register.fields.prefProfession}
            </label>
            <input
              id="prefProfession"
              type="text"
              placeholder={t.register.fields.prefProfessionPlaceholder}
              {...register("partnerPreferences.profession")}
              className="w-full h-12 px-4 rounded-[var(--radius-card)] bg-[var(--surface)] border border-[var(--line)] text-sm text-[var(--ink)] placeholder:text-[var(--ink-faint)] focus:border-[var(--accent)]"
            />
          </div>
        </div>

        {/* Other Expectations */}
        <div>
          <label
            htmlFor="prefOther"
            className="block text-sm font-medium text-[var(--ink)] mb-2"
          >
            {t.register.fields.prefOther}
          </label>
          <textarea
            id="prefOther"
            rows={3}
            placeholder={t.register.fields.prefOtherPlaceholder}
            {...register("partnerPreferences.other")}
            className="w-full p-4 rounded-[var(--radius-card)] bg-[var(--surface)] border border-[var(--line)] text-sm text-[var(--ink)] placeholder:text-[var(--ink-faint)] focus:border-[var(--accent)] leading-relaxed resize-none"
          />
        </div>
      </div>
    </div>
  );
}
