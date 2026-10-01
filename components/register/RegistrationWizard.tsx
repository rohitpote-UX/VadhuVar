"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import {
  registrationSchema,
  step1BasicsSchema,
  step2CareerSchema,
  step3FamilySchema,
  step4PreferencesSchema,
  step5MediaSchema,
  step6ReviewSchema,
  RegistrationFormData,
} from "@/lib/schemas/profile.schema";
import { profilesRepository } from "@/lib/data/profiles.repository";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { StepProgress } from "./StepProgress";
import { StepBasics } from "./StepBasics";
import { StepCareer } from "./StepCareer";
import { StepFamily } from "./StepFamily";
import { StepPreferences } from "./StepPreferences";
import { StepMedia } from "./StepMedia";
import { StepReview } from "./StepReview";

const STORAGE_KEY = "vivaha_registration_draft_v1";

export function RegistrationWizard() {
  const router = useRouter();
  const { t, language } = useLanguage();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const stepHeadingRef = useRef<HTMLHeadingElement | null>(null);

  const stepTitles = [
    t.register.steps.step1,
    t.register.steps.step2,
    t.register.steps.step3,
    t.register.steps.step4,
    t.register.steps.step5,
    t.register.steps.step6,
  ];

  const stepSubtitles = [
    language === "mr"
      ? "कृपया आपली मूलभूत माहिती नोंदवा. ही माहिती पूर्णपणे गोपनीय ठेवली जाते."
      : "Please share your fundamental information. All details are kept strictly private.",
    language === "mr"
      ? "आपले शिक्षण आणि सध्याच्या व्यवसायाविषयी माहिती सांगा."
      : "Tell us about your educational achievements and current profession.",
    language === "mr"
      ? "आपले कुटुंब, आई-वडील आणि मूळ गाव/संस्कृतीविषयी माहिती."
      : "Information regarding your family structure, parental background, and roots.",
    language === "mr"
      ? "आपल्या आवडीनिवडी आणि अपेक्षित जीवनसाथीविषयीच्या अपेक्षा."
      : "Your personal values, daily lifestyle, and expectations for your life partner.",
    language === "mr"
      ? "आपला अलीकडील फोटो आणि बायोडाटा/पत्रिका सुरक्षितपणे जोडा."
      : "Attach a recent photograph and optional biodata document for private review.",
    language === "mr"
      ? "माहिती अचूक असल्याची खात्री करा आणि नोंदणी पूर्ण करा."
      : "Verify your submitted details before formal review by our matchmaker.",
  ];

  const methods = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationSchema) as any,
    mode: "onTouched",
    defaultValues: {
      fullName: "",
      gender: undefined,
      dateOfBirth: "",
      location: "",
      phone: "",
      email: "",
      maritalStatus: undefined,
      education: "",
      institution: "",
      profession: "",
      company: "",
      income: "",
      fatherName: "",
      motherName: "",
      familyBackground: undefined,
      siblings: "",
      familyLocation: "",
      height: "",
      diet: undefined,
      smoking: undefined,
      drinking: undefined,
      hobbies: [],
      about: "",
      partnerPreferences: {
        ageMin: 24,
        ageMax: 32,
        location: "",
        education: "",
        profession: "",
        other: "",
      },
      photoUrl: "",
      biodataUrl: "",
      biodataFileName: "",
      consent: false as unknown as true, // Will be validated at step 6
    },
  });

  const { handleSubmit, trigger, watch, reset } = methods;

  // Restore draft from sessionStorage on mount (excluding uploaded files)
  useEffect(() => {
    try {
      const saved = sessionStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        // Clean out any stale blob URLs from saved session
        delete parsed.photoUrl;
        delete parsed.biodataUrl;
        reset({ ...methods.getValues(), ...parsed });
      }
    } catch (e) {
      console.warn("Could not read registration draft:", e);
    }
  }, [reset, methods]);

  // Autosave draft on form change (excluding uploaded file blobs)
  useEffect(() => {
    const subscription = watch((value) => {
      try {
        const draft = { ...value };
        delete draft.photoUrl;
        delete draft.biodataUrl;
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(draft));
      } catch (e) {
        console.warn("Could not autosave draft:", e);
      }
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  // Focus step heading on step change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (stepHeadingRef.current) {
      stepHeadingRef.current.focus();
    }
  }, [currentStep]);

  // Validate only the current step before advancing
  const handleContinue = async () => {
    let isValid = false;

    if (currentStep === 1) {
      isValid = await trigger([
        "fullName",
        "gender",
        "dateOfBirth",
        "location",
        "phone",
        "email",
        "maritalStatus",
      ]);
    } else if (currentStep === 2) {
      isValid = await trigger([
        "education",
        "institution",
        "profession",
        "company",
        "income",
      ]);
    } else if (currentStep === 3) {
      isValid = await trigger([
        "fatherName",
        "motherName",
        "familyBackground",
        "siblings",
        "familyLocation",
      ]);
    } else if (currentStep === 4) {
      isValid = await trigger([
        "height",
        "diet",
        "smoking",
        "drinking",
        "hobbies",
        "about",
        "partnerPreferences",
      ]);
    } else if (currentStep === 5) {
      isValid = await trigger(["photoUrl", "biodataUrl", "biodataFileName"]);
    }

    if (isValid && currentStep < 6) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleJumpToStep = (stepNumber: number) => {
    if (stepNumber >= 1 && stepNumber <= 6) {
      setCurrentStep(stepNumber);
    }
  };

  const onSubmit = async (data: RegistrationFormData) => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      // Create new profile via repository
      await profilesRepository.create({
        fullName: data.fullName,
        gender: data.gender,
        dateOfBirth: data.dateOfBirth,
        phone: data.phone,
        email: data.email || undefined,
        location: data.location,
        maritalStatus: data.maritalStatus,
        education: data.education,
        institution: data.institution || undefined,
        profession: data.profession,
        company: data.company || undefined,
        income: data.income || undefined,
        fatherName: data.fatherName || undefined,
        motherName: data.motherName || undefined,
        familyBackground: data.familyBackground || undefined,
        siblings: data.siblings || undefined,
        familyLocation: data.familyLocation || undefined,
        height: data.height || undefined,
        diet: data.diet || undefined,
        smoking: data.smoking || undefined,
        drinking: data.drinking || undefined,
        hobbies: data.hobbies || [],
        about: data.about || undefined,
        culturalDetails: {
          nativePlace: (data as any).nativePlace || undefined,
          birthPlace: (data as any).birthPlace || undefined,
          birthTime: (data as any).birthTime || undefined,
          rashi: (data as any).rashi || undefined,
          nakshatra: (data as any).nakshatra || undefined,
          gotra: (data as any).gotra || undefined,
          kuldaivat: (data as any).kuldaivat || undefined,
          caste: (data as any).caste || undefined,
          subcaste: (data as any).subcaste || undefined,
        },
        partnerPreferences: data.partnerPreferences,
        photoUrl: data.photoUrl || undefined,
        biodataUrl: data.biodataUrl || undefined,
        biodataFileName: data.biodataFileName || undefined,
        status: "new",
        adminNotes: "Submitted directly through public registration portal.",
      });

      // Clear draft on successful submission
      try {
        sessionStorage.removeItem(STORAGE_KEY);
      } catch {}

      router.push("/register/success");
    } catch (err) {
      setSubmitError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--bg)] flex flex-col justify-between">
      <div>
        <StepProgress
          currentStep={currentStep}
          totalSteps={6}
          stepTitles={stepTitles}
          onBack={handleBack}
        />

        <main className="max-w-[640px] mx-auto px-5 sm:px-8 pt-8 sm:pt-12 pb-32 sm:pb-24 w-full">
          {/* Step Header */}
          <div className="mb-8 sm:mb-10 text-left">
            <span className="eyebrow block mb-2 text-[var(--accent)] font-semibold">
              {language === "mr"
                ? `पायरी ०${currentStep} पैकी ०६`
                : `STEP 0${currentStep} OF 06`}
            </span>
            <h1
              ref={stepHeadingRef}
              tabIndex={-1}
              className="font-serif text-[clamp(1.875rem,4vw,2.75rem)] leading-[1.15] tracking-[-0.02em] text-[var(--ink)] mb-3 focus:outline-none"
            >
              {stepTitles[currentStep - 1]}
            </h1>
            <p className="text-sm sm:text-base text-[var(--ink-muted)] leading-relaxed">
              {stepSubtitles[currentStep - 1]}
            </p>
          </div>

          {/* Form Context & Animated Step Container */}
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -12 }}
                  transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                >
                  {currentStep === 1 && <StepBasics />}
                  {currentStep === 2 && <StepCareer />}
                  {currentStep === 3 && <StepFamily />}
                  {currentStep === 4 && <StepPreferences />}
                  {currentStep === 5 && <StepMedia />}
                  {currentStep === 6 && (
                    <StepReview onJumpToStep={handleJumpToStep} />
                  )}
                </motion.div>
              </AnimatePresence>

              {/* Submission error feedback */}
              {submitError && (
                <div className="mt-6 p-4 rounded-[var(--radius-card)] bg-[#FDEDED] border border-[var(--danger)] text-sm text-[var(--danger)] flex items-center justify-between">
                  <span>{submitError}</span>
                  <button
                    type="button"
                    onClick={handleSubmit(onSubmit)}
                    className="font-medium underline ml-4 hover:opacity-80"
                  >
                    Retry
                  </button>
                </div>
              )}

              {/* Desktop inline action buttons */}
              <div className="hidden sm:flex items-center justify-between gap-4 mt-12 pt-6 border-t border-[var(--line)]">
                {currentStep > 1 ? (
                  <button
                    type="button"
                    onClick={handleBack}
                    className="btn-secondary"
                  >
                    &larr; {t.register.back}
                  </button>
                ) : (
                  <div />
                )}

                {currentStep < 6 ? (
                  <button
                    type="button"
                    onClick={handleContinue}
                    className="btn-primary"
                  >
                    <span>{t.register.next}</span>
                    <span>&rarr;</span>
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={isSubmitting || !watch("consent")}
                    className="btn-primary"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        {t.register.submitting}
                      </span>
                    ) : (
                      <span>{t.register.submit} &rarr;</span>
                    )}
                  </button>
                )}
              </div>

              {/* Mobile sticky bottom action bar */}
              <div className="sm:hidden fixed bottom-0 left-0 right-0 z-20 bg-[var(--surface)]/95 backdrop-blur-md border-t border-[var(--line)] p-4 pb-[calc(1rem+env(safe-area-inset-bottom))] flex items-center gap-3">
                {currentStep > 1 && (
                  <button
                    type="button"
                    onClick={handleBack}
                    className="h-12 px-5 rounded-full border border-[var(--line)] text-sm font-medium text-[var(--ink)]"
                  >
                    {t.register.back}
                  </button>
                )}

                {currentStep < 6 ? (
                  <button
                    type="button"
                    onClick={handleContinue}
                    className="btn-primary flex-1 h-12"
                  >
                    {t.register.next} &rarr;
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={isSubmitting || !watch("consent")}
                    className="btn-primary flex-1 h-12"
                  >
                    {isSubmitting ? t.register.submitting : `${t.register.submit} →`}
                  </button>
                )}
              </div>
            </form>
          </FormProvider>
        </main>
      </div>
    </div>
  );
}
