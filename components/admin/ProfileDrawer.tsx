"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  X,
  Copy,
  ExternalLink,
  Edit,
  Trash2,
  FileText,
  Lock,
  ChevronDown,
} from "lucide-react";
import { Profile, ProfileStatus } from "@/types/profile";
import { useProfile, useProfileMutations } from "@/lib/data/hooks";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { BRAND_NAME, BRAND_NAME_MR } from "@/lib/constants/brand";
import { StatusBadge } from "./StatusBadge";
import { formatIndianPhone } from "@/lib/utils";

interface ProfileDrawerProps {
  profileId: string | null;
  onClose: () => void;
  onProfileUpdated?: () => void;
  onProfileDeleted?: () => void;
}

export function ProfileDrawer({
  profileId,
  onClose,
  onProfileUpdated,
  onProfileDeleted,
}: ProfileDrawerProps) {
  const { lang } = useLanguage();
  const router = useRouter();
  const { profile, loading, refetch } = useProfile(profileId);
  const { updateStatus, updateProfile, deleteProfile } = useProfileMutations();

  const [notes, setNotes] = useState("");
  const [isSavingNotes, setIsSavingNotes] = useState(false);
  const [statusMenuOpen, setStatusMenuOpen] = useState(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [includeContactInSummary, setIncludeContactInSummary] = useState(false);

  useEffect(() => {
    if (profile) {
      setNotes(profile.adminNotes || "");
    }
  }, [profile]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !deleteConfirmOpen) {
        onClose();
      }
    };
    if (profileId) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [profileId, onClose, deleteConfirmOpen]);

  if (!profileId) return null;

  const handleStatusChange = async (newStatus: ProfileStatus) => {
    setStatusMenuOpen(false);
    if (!profile) return;
    try {
      await updateStatus(profile.id, newStatus);
      toast.success(
        lang === "mr"
          ? "प्रोफाइल स्थिती यशस्वीरित्या बदलली"
          : `Profile status changed to ${newStatus}`
      );
      refetch();
      onProfileUpdated?.();
    } catch {
      toast.error(
        lang === "mr" ? "स्थिती बदलता आली नाही" : "Failed to update status"
      );
    }
  };

  const handleSaveNotes = async () => {
    if (!profile) return;
    setIsSavingNotes(true);
    try {
      await updateProfile(profile.id, { adminNotes: notes });
      toast.success(
        lang === "mr"
          ? "खाजगी टिपण जतन करण्यात आले"
          : "Private matchmaker notes saved"
      );
      onProfileUpdated?.();
    } catch {
      toast.error(
        lang === "mr" ? "टिपण जतन करता आले नाही" : "Could not save notes"
      );
    } finally {
      setIsSavingNotes(false);
    }
  };

  const handleCopySummary = () => {
    if (!profile) return;

    const brand = lang === "mr" ? BRAND_NAME_MR : BRAND_NAME;
    let summary = "";

    if (lang === "mr") {
      summary = `${brand} — उमेदवार सारांश
नाव: ${profile.fullName}
वय व लिंग: ${profile.age} वर्षे (${profile.gender === "Female" ? "वधू" : "वर"})
स्थान: ${profile.location}
वैवाहिक स्थिती: ${profile.maritalStatus}
शिक्षण: ${profile.education}${profile.institution ? ` (${profile.institution})` : ""}
व्यवसाय: ${profile.profession}${profile.company ? ` (${profile.company})` : ""}
कुटुंब: ${profile.familyBackground || "सुसंस्कृत"} कुटुंब, मूळ: ${profile.culturalDetails?.nativePlace || profile.familyLocation || "महाराष्ट्र"}
वडील: ${profile.fatherName || "—"} | आई: ${profile.motherName || "—"}
उंची: ${profile.height || "—"} | आहार: ${profile.diet || "—"}`;

      if (profile.culturalDetails) {
        const c = profile.culturalDetails;
        if (c.rashi || c.kuldaivat || c.gotra) {
          summary += `\nसंस्कृती/पत्रिका: रास: ${c.rashi || "—"}, नक्षत्र: ${c.nakshatra || "—"}, कुलदैवत: ${c.kuldaivat || "—"}`;
        }
      }

      summary += `\nजीवनसाथीविषयी अपेक्षा: ${profile.partnerPreferences?.ageMin ?? 24}–${profile.partnerPreferences?.ageMax ?? 32} वर्षे, ${profile.partnerPreferences?.education || "उच्चशिक्षित"}, स्थान: ${profile.partnerPreferences?.location || "महाराष्ट्र"}`;

      if (profile.about) {
        summary += `\nउमेदवाराचे मनोगत: "${profile.about}"`;
      }

      if (includeContactInSummary) {
        summary += `\n\nसंपर्क माहिती (संमतीनुसार):
फोन: ${formatIndianPhone(profile.phone)}
ईमेल: ${profile.email || "उपलब्ध नाही"}`;
      }
    } else {
      summary = `${brand} — CANDIDATE SUMMARY
Name: ${profile.fullName}
Age & Gender: ${profile.age} yrs (${profile.gender})
Location: ${profile.location}
Marital Status: ${profile.maritalStatus}
Education: ${profile.education}${profile.institution ? ` (${profile.institution})` : ""}
Profession: ${profile.profession}${profile.company ? ` at ${profile.company}` : ""}
Family: ${profile.familyBackground || "Cultured"} family, Native: ${profile.culturalDetails?.nativePlace || profile.familyLocation || "Pune"}
Father: ${profile.fatherName || "—"} | Mother: ${profile.motherName || "—"}
Height: ${profile.height || "—"} | Diet: ${profile.diet || "—"}
Partner Preferences: Looking for ${profile.partnerPreferences?.ageMin ?? 24}–${profile.partnerPreferences?.ageMax ?? 32} yrs, ${profile.partnerPreferences?.education || "Professional degree"}, in ${profile.partnerPreferences?.location || "Maharashtra"}`;

      if (profile.about) {
        summary += `\nCandidate Note: "${profile.about}"`;
      }

      if (includeContactInSummary) {
        summary += `\n\nCONTACT DETAILS (AUTHORIZED SHARING):
Phone: ${formatIndianPhone(profile.phone)}
Email: ${profile.email || "Not specified"}`;
      }
    }

    navigator.clipboard.writeText(summary);
    toast.success(
      includeContactInSummary
        ? lang === "mr"
          ? "संपर्क माहितीसह सारांश कॉपी केला"
          : "Summary copied with contact details"
        : lang === "mr"
        ? "गोपनीय सारांश कॉपी केला (संपर्क क्रमांक लपवला आहे)"
        : "Shareable summary copied (contacts hidden)"
    );
  };

  const handleDelete = async () => {
    if (!profile) return;
    try {
      await deleteProfile(profile.id);
      toast.success(
        lang === "mr"
          ? `${profile.fullName} यांचे प्रोफाइल हटवले`
          : `Profile for ${profile.fullName} deleted permanently`
      );
      setDeleteConfirmOpen(false);
      onClose();
      onProfileDeleted?.();
    } catch {
      toast.error(
        lang === "mr" ? "प्रोफाइल हटवता आले नाही" : "Failed to delete profile"
      );
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-black/35 backdrop-blur-xs transition-opacity duration-200"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Slide-out Sheet (560px on desktop, full-width on mobile) */}
      <div
        className="fixed top-0 right-0 bottom-0 z-50 w-full sm:max-w-[560px] bg-[var(--surface)] border-l border-[var(--line)] shadow-[var(--shadow-drawer)] flex flex-col justify-between overflow-hidden animate-in slide-in-from-right duration-250 ease-[cubic-bezier(0.22,1,0.36,1)]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="drawer-profile-title"
      >
        {/* Top Header */}
        <div className="p-6 border-b border-[var(--line)] bg-[var(--surface-2)]/40 relative flex-shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="absolute top-5 right-5 p-1.5 rounded-full hover:bg-[var(--surface-2)] text-[var(--ink-muted)] hover:text-[var(--ink)] transition-colors"
            aria-label="Close drawer"
          >
            <X className="w-5 h-5" />
          </button>

          {loading ? (
            <div className="flex items-center gap-4 animate-pulse">
              <div className="w-16 h-16 rounded-xl bg-[var(--line)]" />
              <div className="space-y-2 flex-1">
                <div className="w-32 h-5 bg-[var(--line)] rounded" />
                <div className="w-24 h-4 bg-[var(--line)] rounded" />
              </div>
            </div>
          ) : profile ? (
            <div className="flex items-start gap-4 pr-8">
              {/* Photo or Initials */}
              {profile.photoUrl && profile.photoUrl.startsWith("http") ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={profile.photoUrl}
                  alt={profile.fullName}
                  className="w-16 h-16 rounded-xl object-cover border border-[var(--line)] flex-shrink-0"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = "none";
                  }}
                />
              ) : (
                <div className="w-16 h-16 rounded-xl bg-[var(--accent-soft)] text-[var(--accent)] font-serif text-xl flex items-center justify-center font-medium flex-shrink-0 border border-[#F0D5D8]">
                  {profile.fullName
                    .split(" ")
                    .map((n) => n[0])
                    .slice(0, 2)
                    .join("")}
                </div>
              )}

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-1">
                  <h2
                    id="drawer-profile-title"
                    className="font-serif text-2xl text-[var(--ink)] truncate font-normal"
                  >
                    {profile.fullName}
                  </h2>
                </div>

                <div className="flex items-center gap-2 text-xs text-[var(--ink-muted)] mb-3">
                  <span>{profile.age} {lang === "mr" ? "वर्षे" : "yrs"}</span>
                  <span>&bull;</span>
                  <span>
                    {lang === "mr"
                      ? profile.gender === "Female"
                        ? "वधू"
                        : "वर"
                      : profile.gender}
                  </span>
                  <span>&bull;</span>
                  <span>{profile.location.split(",")[0]}</span>
                </div>

                {/* Inline Status Dropdown */}
                <div className="relative inline-block">
                  <button
                    type="button"
                    onClick={() => setStatusMenuOpen(!statusMenuOpen)}
                    className="inline-flex items-center gap-1.5 focus:outline-none"
                    aria-expanded={statusMenuOpen}
                  >
                    <StatusBadge status={profile.status} />
                    <ChevronDown className="w-3.5 h-3.5 text-[var(--ink-muted)]" />
                  </button>

                  {statusMenuOpen && (
                    <div className="absolute left-0 mt-1.5 w-44 bg-[var(--surface)] border border-[var(--line)] rounded-[var(--radius-card)] shadow-[var(--shadow-drawer)] py-1 z-30 animate-in fade-in duration-100">
                      {(["new", "active", "inactive", "matched", "closed"] as ProfileStatus[]).map(
                        (st) => (
                          <button
                            key={st}
                            type="button"
                            onClick={() => handleStatusChange(st)}
                            className={`w-full px-3 py-2 text-left text-xs flex items-center justify-between hover:bg-[var(--surface-2)] transition-colors ${
                              profile.status === st ? "font-semibold" : ""
                            }`}
                          >
                            <StatusBadge status={st} size="sm" />
                          </button>
                        )
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="text-sm text-[var(--danger)]">
              {lang === "mr" ? "प्रोफाइल आढळले नाही." : "Profile not found."}
            </div>
          )}
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {profile && (
            <>
              {/* Controlled Share Tool */}
              <div className="bg-[var(--surface-2)]/50 border border-[var(--line)] rounded-[var(--radius-card)] p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider text-[var(--ink)]">
                    {lang === "mr" ? "नियंत्रित सामायिकरण सारांश" : "Controlled Sharing Dossier"}
                  </span>
                  <button
                    type="button"
                    onClick={handleCopySummary}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[var(--surface)] border border-[var(--line)] text-xs font-medium text-[var(--accent)] hover:border-[var(--accent)] transition-colors"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>{lang === "mr" ? "बायोडाटा सारांश कॉपी करा" : "Copy Shareable Summary"}</span>
                  </button>
                </div>

                <label className="flex items-center gap-2 cursor-pointer text-xs text-[var(--ink-muted)]">
                  <input
                    type="checkbox"
                    checked={includeContactInSummary}
                    onChange={(e) =>
                      setIncludeContactInSummary(e.target.checked)
                    }
                    className="rounded border-[var(--line)] text-[var(--accent)] focus:ring-[var(--accent)]"
                  />
                  <span>
                    {lang === "mr"
                      ? "संपर्क क्रमांक व ईमेल समाविष्ट करा (संमतीनुसार)"
                      : "Include phone & email (disclosed only with consent)"}
                  </span>
                </label>
              </div>

              {/* Basic Section */}
              <div className="space-y-3">
                <span className="eyebrow block">
                  {lang === "mr" ? "वैयक्तिक तपशील" : "BASIC PARTICULARS"}
                </span>
                <div className="grid grid-cols-2 gap-3 text-xs bg-[var(--surface-2)]/30 p-4 rounded-lg">
                  <div>
                    <span className="text-[var(--ink-muted)] block">
                      {lang === "mr" ? "जन्मतारीख" : "Date of Birth"}
                    </span>
                    <span className="font-medium text-[var(--ink)] tabular-nums">
                      {profile.dateOfBirth} ({profile.age} {lang === "mr" ? "वर्षे" : "years"})
                    </span>
                  </div>
                  <div>
                    <span className="text-[var(--ink-muted)] block">
                      {lang === "mr" ? "वैवाहिक स्थिती" : "Marital Status"}
                    </span>
                    <span className="font-medium text-[var(--ink)]">
                      {profile.maritalStatus}
                    </span>
                  </div>
                  <div>
                    <span className="text-[var(--ink-muted)] block">
                      {lang === "mr" ? "गोपनीय संपर्क" : "Confidential Contact"}
                    </span>
                    <span className="font-medium text-[var(--ink)] tabular-nums">
                      {formatIndianPhone(profile.phone)}
                    </span>
                  </div>
                  <div>
                    <span className="text-[var(--ink-muted)] block">
                      {lang === "mr" ? "ईमेल पत्ता" : "Email Address"}
                    </span>
                    <span className="font-medium text-[var(--ink)]">
                      {profile.email || "—"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Education & Career */}
              <div className="space-y-3">
                <span className="eyebrow block">
                  {lang === "mr" ? "शिक्षण आणि व्यवसाय" : "EDUCATION & CAREER"}
                </span>
                <div className="grid grid-cols-2 gap-3 text-xs bg-[var(--surface-2)]/30 p-4 rounded-lg">
                  <div className="col-span-2">
                    <span className="text-[var(--ink-muted)] block">
                      {lang === "mr" ? "उच्च शिक्षण" : "Highest Qualification"}
                    </span>
                    <span className="font-medium text-[var(--ink)]">
                      {profile.education}
                      {profile.institution && ` &bull; ${profile.institution}`}
                    </span>
                  </div>
                  <div>
                    <span className="text-[var(--ink-muted)] block">
                      {lang === "mr" ? "व्यवसाय" : "Profession"}
                    </span>
                    <span className="font-medium text-[var(--ink)]">
                      {profile.profession}
                    </span>
                  </div>
                  <div>
                    <span className="text-[var(--ink-muted)] block">
                      {lang === "mr" ? "कंपनी / संस्था" : "Company / Organization"}
                    </span>
                    <span className="font-medium text-[var(--ink)]">
                      {profile.company || "—"}
                    </span>
                  </div>
                  <div>
                    <span className="text-[var(--ink-muted)] block">
                      {lang === "mr" ? "वार्षिक उत्पन्न" : "Annual Income"}
                    </span>
                    <span className="font-medium text-[var(--ink)]">
                      {profile.income || (lang === "mr" ? "गोपनीय" : "Prefer not to disclose")}
                    </span>
                  </div>
                </div>
              </div>

              {/* Family */}
              <div className="space-y-3">
                <span className="eyebrow block">
                  {lang === "mr" ? "कुटुंबाची माहिती" : "FAMILY PARTICULARS"}
                </span>
                <div className="grid grid-cols-2 gap-3 text-xs bg-[var(--surface-2)]/30 p-4 rounded-lg">
                  <div>
                    <span className="text-[var(--ink-muted)] block">
                      {lang === "mr" ? "वडिलांचे नाव" : "Father"}
                    </span>
                    <span className="font-medium text-[var(--ink)]">
                      {profile.fatherName || "—"}
                    </span>
                  </div>
                  <div>
                    <span className="text-[var(--ink-muted)] block">
                      {lang === "mr" ? "आईचे नाव" : "Mother"}
                    </span>
                    <span className="font-medium text-[var(--ink)]">
                      {profile.motherName || "—"}
                    </span>
                  </div>
                  <div>
                    <span className="text-[var(--ink-muted)] block">
                      {lang === "mr" ? "कुटुंब प्रकार" : "Structure"}
                    </span>
                    <span className="font-medium text-[var(--ink)]">
                      {profile.familyBackground
                        ? `${profile.familyBackground} Family`
                        : "—"}
                    </span>
                  </div>
                  <div>
                    <span className="text-[var(--ink-muted)] block">
                      {lang === "mr" ? "मूळ वस्ती / सध्याचे ठिकाण" : "Native Base"}
                    </span>
                    <span className="font-medium text-[var(--ink)]">
                      {profile.familyLocation || "—"}
                    </span>
                  </div>
                  <div className="col-span-2">
                    <span className="text-[var(--ink-muted)] block">
                      {lang === "mr" ? "भावंडे" : "Siblings"}
                    </span>
                    <span className="font-medium text-[var(--ink)]">
                      {profile.siblings || (lang === "mr" ? "माहिती नाही" : "None")}
                    </span>
                  </div>
                </div>
              </div>

              {/* Optional Maharashtra Cultural & Astrological Details */}
              {profile.culturalDetails && (
                <div className="space-y-3">
                  <span className="eyebrow block">
                    {lang === "mr" ? "सांस्कृतिक व पत्रिका माहिती" : "CULTURAL & ASTROLOGICAL DETAILS"}
                  </span>
                  <div className="grid grid-cols-2 gap-3 text-xs bg-[var(--surface-2)]/30 p-4 rounded-lg">
                    {profile.culturalDetails.nativePlace && (
                      <div>
                        <span className="text-[var(--ink-muted)] block">
                          {lang === "mr" ? "मूळ गाव" : "Native Place"}
                        </span>
                        <span className="font-medium text-[var(--ink)]">
                          {profile.culturalDetails.nativePlace}
                        </span>
                      </div>
                    )}
                    {profile.culturalDetails.birthPlace && (
                      <div>
                        <span className="text-[var(--ink-muted)] block">
                          {lang === "mr" ? "जन्मस्थळ" : "Birth Place"}
                        </span>
                        <span className="font-medium text-[var(--ink)]">
                          {profile.culturalDetails.birthPlace}
                        </span>
                      </div>
                    )}
                    {profile.culturalDetails.birthTime && (
                      <div>
                        <span className="text-[var(--ink-muted)] block">
                          {lang === "mr" ? "जन्मवेळ" : "Birth Time"}
                        </span>
                        <span className="font-medium text-[var(--ink)]">
                          {profile.culturalDetails.birthTime}
                        </span>
                      </div>
                    )}
                    {profile.culturalDetails.rashi && (
                      <div>
                        <span className="text-[var(--ink-muted)] block">
                          {lang === "mr" ? "रास" : "Rashi"}
                        </span>
                        <span className="font-medium text-[var(--ink)]">
                          {profile.culturalDetails.rashi}
                        </span>
                      </div>
                    )}
                    {profile.culturalDetails.nakshatra && (
                      <div>
                        <span className="text-[var(--ink-muted)] block">
                          {lang === "mr" ? "नक्षत्र" : "Nakshatra"}
                        </span>
                        <span className="font-medium text-[var(--ink)]">
                          {profile.culturalDetails.nakshatra}
                        </span>
                      </div>
                    )}
                    {profile.culturalDetails.kuldaivat && (
                      <div>
                        <span className="text-[var(--ink-muted)] block">
                          {lang === "mr" ? "कुलदैवत" : "Kuldaivat"}
                        </span>
                        <span className="font-medium text-[var(--ink)]">
                          {profile.culturalDetails.kuldaivat}
                        </span>
                      </div>
                    )}
                    {profile.culturalDetails.gotra && (
                      <div>
                        <span className="text-[var(--ink-muted)] block">
                          {lang === "mr" ? "गोत्र" : "Gotra"}
                        </span>
                        <span className="font-medium text-[var(--ink)]">
                          {profile.culturalDetails.gotra}
                        </span>
                      </div>
                    )}
                    {profile.culturalDetails.caste && (
                      <div>
                        <span className="text-[var(--ink-muted)] block">
                          {lang === "mr" ? "जात / पोटजात" : "Caste / Sub-caste"}
                        </span>
                        <span className="font-medium text-[var(--ink)]">
                          {profile.culturalDetails.caste}
                          {profile.culturalDetails.subcaste ? ` (${profile.culturalDetails.subcaste})` : ""}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Personal & Lifestyle */}
              <div className="space-y-3">
                <span className="eyebrow block">
                  {lang === "mr" ? "जीवनशैली आणि स्वभाव" : "LIFESTYLE & ABOUT"}
                </span>
                <div className="text-xs bg-[var(--surface-2)]/30 p-4 rounded-lg space-y-3">
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <span className="text-[var(--ink-muted)] block">
                        {lang === "mr" ? "उंची" : "Height"}
                      </span>
                      <span className="font-medium text-[var(--ink)]">
                        {profile.height || "—"}
                      </span>
                    </div>
                    <div>
                      <span className="text-[var(--ink-muted)] block">
                        {lang === "mr" ? "आहार" : "Diet"}
                      </span>
                      <span className="font-medium text-[var(--ink)]">
                        {profile.diet || "—"}
                      </span>
                    </div>
                  </div>

                  {profile.hobbies && profile.hobbies.length > 0 && (
                    <div>
                      <span className="text-[var(--ink-muted)] block mb-1">
                        {lang === "mr" ? "छंद आणि आवडी" : "Hobbies & Interests"}
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {profile.hobbies.map((h) => (
                          <span
                            key={h}
                            className="bg-[var(--surface)] border border-[var(--line)] text-[var(--ink)] px-2.5 py-0.5 rounded-full text-[11px]"
                          >
                            {h}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {profile.about && (
                    <div>
                      <span className="text-[var(--ink-muted)] block mb-1">
                        {lang === "mr" ? "उमेदवाराचे मनोगत" : "Candidate Reflection"}
                      </span>
                      <p className="italic text-[var(--ink)] leading-relaxed">
                        &ldquo;{profile.about}&rdquo;
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Partner Preferences */}
              <div className="space-y-3">
                <span className="eyebrow block">
                  {lang === "mr" ? "जीवनसाथीविषयी अपेक्षा" : "PARTNER PREFERENCES"}
                </span>
                <div className="grid grid-cols-2 gap-3 text-xs bg-[var(--surface-2)]/30 p-4 rounded-lg">
                  <div>
                    <span className="text-[var(--ink-muted)] block">
                      {lang === "mr" ? "अपेक्षित वयोमर्यादा" : "Age Range"}
                    </span>
                    <span className="font-medium text-[var(--ink)] tabular-nums">
                      {profile.partnerPreferences?.ageMin ?? 24} –{" "}
                      {profile.partnerPreferences?.ageMax ?? 32} {lang === "mr" ? "वर्षे" : "years"}
                    </span>
                  </div>
                  <div>
                    <span className="text-[var(--ink-muted)] block">
                      {lang === "mr" ? "अपेक्षित ठिकाण" : "Preferred Location"}
                    </span>
                    <span className="font-medium text-[var(--ink)]">
                      {profile.partnerPreferences?.location || (lang === "mr" ? "बंधन नाही" : "Flexible")}
                    </span>
                  </div>
                  <div className="col-span-2">
                    <span className="text-[var(--ink-muted)] block">
                      {lang === "mr" ? "शिक्षण व व्यवसाय अपेक्षा" : "Education & Profession"}
                    </span>
                    <span className="font-medium text-[var(--ink)]">
                      {profile.partnerPreferences?.education || "Graduate"} &bull;{" "}
                      {profile.partnerPreferences?.profession || "Any professional"}
                    </span>
                  </div>
                  {profile.partnerPreferences?.other && (
                    <div className="col-span-2">
                      <span className="text-[var(--ink-muted)] block">
                        {lang === "mr" ? "इतर विशेष अपेक्षा" : "Specific Values"}
                      </span>
                      <p className="text-[var(--ink)] mt-0.5">
                        {profile.partnerPreferences.other}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Documents & Biodata */}
              <div className="space-y-3">
                <span className="eyebrow block">
                  {lang === "mr" ? "संलग्न कागदपत्रे व बायोडाटा" : "ATTACHED DOCUMENTS"}
                </span>
                {profile.biodataUrl ? (
                  <div className="flex items-center justify-between p-3.5 bg-[var(--surface-2)]/50 border border-[var(--line)] rounded-lg text-xs">
                    <div className="flex items-center gap-2.5">
                      <FileText className="w-5 h-5 text-[var(--accent)] flex-shrink-0" />
                      <div>
                        <span className="font-medium text-[var(--ink)] block">
                          {profile.biodataFileName || "Candidate_Biodata.pdf"}
                        </span>
                        <span className="text-[var(--ink-muted)] text-[11px]">
                          PDF Document &bull; Private Vault
                        </span>
                      </div>
                    </div>
                    <a
                      href={profile.biodataUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 rounded-full border border-[var(--line)] bg-[var(--surface)] text-[var(--ink)] hover:text-[var(--accent)] font-medium"
                    >
                      {lang === "mr" ? "कागदपत्र पहा" : "View Document"}
                    </a>
                  </div>
                ) : (
                  <div className="p-3 bg-[var(--surface-2)]/30 rounded-lg text-xs text-[var(--ink-muted)] flex items-center gap-2">
                    <Lock className="w-3.5 h-3.5" />
                    <span>
                      {lang === "mr"
                        ? "कोणतीही स्वतंत्र पीडीएफ जोडलेली नाही"
                        : "No separate biodata PDF attached"}
                    </span>
                  </div>
                )}
              </div>

              {/* Matchmaker Private Notes */}
              <div className="space-y-2 pt-2">
                <div className="flex items-center justify-between">
                  <span className="eyebrow">
                    {lang === "mr"
                      ? "संस्थेचे खाजगी टिपण (गोपनीय)"
                      : "INTERNAL MATCHMAKER NOTES (CONFIDENTIAL)"}
                  </span>
                  {notes !== (profile.adminNotes || "") && (
                    <button
                      type="button"
                      onClick={handleSaveNotes}
                      disabled={isSavingNotes}
                      className="text-xs text-[var(--accent)] font-medium hover:underline"
                    >
                      {isSavingNotes
                        ? lang === "mr"
                          ? "जतन करत आहे..."
                          : "Saving..."
                        : lang === "mr"
                        ? "टिपण जतन करा"
                        : "Save Notes"}
                    </button>
                  )}
                </div>
                <textarea
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder={
                    lang === "mr"
                      ? "गोपनीय टिपण, कुटुंबाशी चर्चेतील मुद्दे, अनुकूलता निरीक्षणे येथे नोंदवा..."
                      : "Record confidential matchmaker remarks, family meeting notes, compatibility observations..."
                  }
                  className="w-full p-3 rounded-lg border border-[var(--line)] bg-[var(--surface)] text-xs text-[var(--ink)] leading-relaxed focus:border-[var(--accent)]"
                />
              </div>
            </>
          )}
        </div>

        {/* Sticky Action Footer */}
        <div className="p-4 border-t border-[var(--line)] bg-[var(--surface)] flex items-center justify-between gap-3 flex-shrink-0">
          <div className="flex items-center gap-2">
            {profile && (
              <button
                type="button"
                onClick={() => setDeleteConfirmOpen(true)}
                className="btn-destructive text-xs h-9 px-3"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">
                  {lang === "mr" ? "काढून टाका" : "Delete"}
                </span>
              </button>
            )}
          </div>

          <div className="flex items-center gap-2.5">
            {profile && (
              <Link
                href={`/admin/profiles/${profile.id}`}
                onClick={onClose}
                className="btn-secondary h-9 px-3.5 text-xs font-medium"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>{lang === "mr" ? "सविस्तर पृष्ठ" : "Full Page"}</span>
              </Link>
            )}

            {profile && (
              <Link
                href={`/admin/profiles/${profile.id}/edit`}
                onClick={onClose}
                className="btn-primary h-9 px-4 text-xs font-medium"
              >
                <Edit className="w-3.5 h-3.5" />
                <span>{lang === "mr" ? "माहिती बदला" : "Edit Profile"}</span>
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      {deleteConfirmOpen && profile && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="w-full max-w-[420px] bg-[var(--surface)] border border-[var(--line)] rounded-[var(--radius-card)] p-6 shadow-xl space-y-4">
            <span className="eyebrow text-[var(--danger)]">
              {lang === "mr" ? "कायमस्वरूपी काढून टाकणे" : "PERMANENT DELETION"}
            </span>
            <h3 className="font-serif text-xl font-normal text-[var(--ink)]">
              {lang === "mr"
                ? "प्रोफाइल कायमचे हटवायचे?"
                : "Delete profile permanently?"}
            </h3>
            <p className="text-xs text-[var(--ink-muted)] leading-relaxed">
              {lang === "mr" ? (
                <>
                  ही कृती पूर्ववत केली जाऊ शकत नाही.{" "}
                  <strong className="text-[var(--ink)] font-semibold">
                    {profile.fullName}
                  </strong>{" "}
                  यांचे सर्व रेकॉर्ड्स, टिपणे आणि जोडलेली कागदपत्रे कायमची हटवली जातील.
                </>
              ) : (
                <>
                  This action cannot be undone. All records, notes, and attached
                  documents for{" "}
                  <strong className="text-[var(--ink)] font-semibold">
                    {profile.fullName}
                  </strong>{" "}
                  will be permanently erased from the CRM database.
                </>
              )}
            </p>

            <div className="flex items-center justify-end gap-3 pt-3">
              <button
                type="button"
                onClick={() => setDeleteConfirmOpen(false)}
                className="btn-secondary h-9 px-4 text-xs font-medium"
              >
                {lang === "mr" ? "रद्द करा" : "Cancel"}
              </button>
              <button
                type="button"
                onClick={handleDelete}
                className="h-9 px-4 rounded-full bg-[var(--danger)] text-white hover:bg-[#8F1F1F] text-xs font-medium transition-colors"
              >
                {lang === "mr" ? "नक्की हटवा" : "Confirm Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

