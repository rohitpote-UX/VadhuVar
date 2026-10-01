"use client";

import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { toast } from "sonner";
import { Profile, ProfileStatus } from "@/types/profile";
import { useProfileMutations } from "@/lib/data/hooks";
import { StepBasics } from "../register/StepBasics";
import { StepCareer } from "../register/StepCareer";
import { StepFamily } from "../register/StepFamily";
import { StepPreferences } from "../register/StepPreferences";
import { StepMedia } from "../register/StepMedia";
import { RegistrationFormData } from "@/lib/schemas/profile.schema";

interface ProfileFormProps {
  initialProfile?: Profile;
  onSuccess: (saved: Profile) => void;
  onCancel: () => void;
}

export function ProfileForm({
  initialProfile,
  onSuccess,
  onCancel,
}: ProfileFormProps) {
  const { createProfile, updateProfile, isSubmitting } = useProfileMutations();
  const [adminNotes, setAdminNotes] = useState(
    initialProfile?.adminNotes || ""
  );
  const [status, setStatus] = useState<ProfileStatus>(
    initialProfile?.status || "new"
  );

  const methods = useForm<RegistrationFormData>({
    mode: "onTouched",
    defaultValues: {
      fullName: initialProfile?.fullName || "",
      gender: initialProfile?.gender || undefined,
      dateOfBirth: initialProfile?.dateOfBirth || "",
      location: initialProfile?.location || "",
      phone: initialProfile?.phone || "",
      email: initialProfile?.email || "",
      maritalStatus: initialProfile?.maritalStatus || undefined,
      education: initialProfile?.education || "",
      institution: initialProfile?.institution || "",
      profession: initialProfile?.profession || "",
      company: initialProfile?.company || "",
      income: initialProfile?.income || "",
      fatherName: initialProfile?.fatherName || "",
      motherName: initialProfile?.motherName || "",
      familyBackground: initialProfile?.familyBackground || undefined,
      siblings: initialProfile?.siblings || "",
      familyLocation: initialProfile?.familyLocation || "",
      height: initialProfile?.height || "",
      diet: initialProfile?.diet || undefined,
      smoking: initialProfile?.smoking || undefined,
      drinking: initialProfile?.drinking || undefined,
      hobbies: initialProfile?.hobbies || [],
      about: initialProfile?.about || "",
      partnerPreferences: initialProfile?.partnerPreferences || {
        ageMin: 24,
        ageMax: 32,
        location: "",
        education: "",
        profession: "",
        other: "",
      },
      photoUrl: initialProfile?.photoUrl || "",
      biodataUrl: initialProfile?.biodataUrl || "",
      biodataFileName: initialProfile?.biodataFileName || "",
      consent: true,
    },
  });

  const {
    handleSubmit,
    formState: { isDirty },
  } = methods;

  const onSubmit = async (data: RegistrationFormData) => {
    try {
      if (initialProfile) {
        const updated = await updateProfile(initialProfile.id, {
          ...data,
          status,
          adminNotes,
        });
        toast.success(`Profile for ${updated.fullName} updated successfully`);
        onSuccess(updated);
      } else {
        const created = await createProfile({
          ...data,
          status,
          adminNotes: adminNotes || "Intake recorded by matchmaker.",
        });
        toast.success(`New profile created for ${created.fullName}`);
        onSuccess(created);
      }
    } catch {
      toast.error("Failed to save profile. Please check form fields.");
    }
  };

  const handleCancel = () => {
    if (isDirty) {
      if (
        !confirm(
          "You have unsaved changes. Are you sure you wish to discard them?"
        )
      ) {
        return;
      }
    }
    onCancel();
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Status & Matchmaker Note Configuration */}
        <div className="bg-[var(--surface-2)]/60 border border-[var(--line)] rounded-[var(--radius-card)] p-4 sm:p-5 space-y-4">
          <span className="eyebrow block">MATCHMAKER ADMINISTRATIVE CONTROLS</span>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="profileStatus"
                className="block text-xs font-semibold uppercase tracking-wider text-[var(--ink-muted)] mb-2"
              >
                Profile Lifecycle Status
              </label>
              <select
                id="profileStatus"
                value={status}
                onChange={(e) => setStatus(e.target.value as ProfileStatus)}
                className="w-full h-11 px-3 rounded-lg border border-[var(--line)] bg-[var(--surface)] text-sm text-[var(--ink)] focus:border-[var(--accent)]"
              >
                <option value="new">Needs Review (New)</option>
                <option value="active">Active (Available for Matches)</option>
                <option value="matched">Matched (In Exclusive Courtship)</option>
                <option value="inactive">Inactive (On Hold / Paused)</option>
                <option value="closed">Closed (Settled / Archived)</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="adminNotes"
                className="block text-xs font-semibold uppercase tracking-wider text-[var(--ink-muted)] mb-2"
              >
                Internal Private Remarks
              </label>
              <input
                id="adminNotes"
                type="text"
                value={adminNotes}
                onChange={(e) => setAdminNotes(e.target.value)}
                placeholder="Confidential matchmaker assessment..."
                className="w-full h-11 px-3 rounded-lg border border-[var(--line)] bg-[var(--surface)] text-sm text-[var(--ink)] focus:border-[var(--accent)]"
              />
            </div>
          </div>
        </div>

        {/* Section 1: Basics */}
        <div className="bg-[var(--surface)] border border-[var(--line)] rounded-[var(--radius-card)] p-6 space-y-4">
          <span className="eyebrow block">01 — BASIC PARTICULARS</span>
          <StepBasics />
        </div>

        {/* Section 2: Career */}
        <div className="bg-[var(--surface)] border border-[var(--line)] rounded-[var(--radius-card)] p-6 space-y-4">
          <span className="eyebrow block">02 — EDUCATION &amp; CAREER</span>
          <StepCareer />
        </div>

        {/* Section 3: Family */}
        <div className="bg-[var(--surface)] border border-[var(--line)] rounded-[var(--radius-card)] p-6 space-y-4">
          <span className="eyebrow block">03 — FAMILY BACKGROUND</span>
          <StepFamily />
        </div>

        {/* Section 4: Preferences & Lifestyle */}
        <div className="bg-[var(--surface)] border border-[var(--line)] rounded-[var(--radius-card)] p-6 space-y-4">
          <span className="eyebrow block">04 — LIFESTYLE &amp; PREFERENCES</span>
          <StepPreferences />
        </div>

        {/* Section 5: Media & Documents */}
        <div className="bg-[var(--surface)] border border-[var(--line)] rounded-[var(--radius-card)] p-6 space-y-4">
          <span className="eyebrow block">05 — ATTACHED DOCUMENTS &amp; PHOTO</span>
          <StepMedia />
        </div>

        {/* Sticky Save Bar */}
        <div className="sticky bottom-0 z-20 -mx-6 -mb-6 p-4 border-t border-[var(--line)] bg-[var(--surface)]/95 backdrop-blur-md flex items-center justify-between shadow-lg">
          <button
            type="button"
            onClick={handleCancel}
            className="btn-secondary h-11 px-5 text-sm"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={isSubmitting}
            className="btn-primary h-11 px-6 text-sm"
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Saving Profile...
              </span>
            ) : initialProfile ? (
              "Save Changes"
            ) : (
              "Create Profile"
            )}
          </button>
        </div>
      </form>
    </FormProvider>
  );
}
