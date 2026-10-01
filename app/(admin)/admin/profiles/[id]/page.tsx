"use client";

import { use, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  ArrowLeft,
  Edit,
  Trash2,
  Copy,
  FileText,
  Lock,
} from "lucide-react";
import { useProfile, useProfileMutations } from "@/lib/data/hooks";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { BRAND_NAME, BRAND_NAME_MR } from "@/lib/constants/brand";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { formatIndianPhone } from "@/lib/utils";
import { ProfileStatus } from "@/types/profile";

export default function ProfileDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const router = useRouter();
  const { profile, loading, refetch } = useProfile(resolvedParams.id);
  const { updateStatus, updateProfile, deleteProfile } = useProfileMutations();

  const [notes, setNotes] = useState("");
  const [includeContact, setIncludeContact] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(false);

  if (loading) {
    return (
      <div className="p-8 max-w-[1200px] mx-auto space-y-6 animate-pulse">
        <div className="w-32 h-6 bg-[var(--line)] rounded" />
        <div className="h-64 bg-[var(--surface)] border border-[var(--line)] rounded-xl" />
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="p-12 text-center">
        <h2 className="font-serif text-2xl text-[var(--ink)] mb-3">
          Profile not found
        </h2>
        <Link href="/admin/profiles" className="btn-secondary">
          &larr; Back to Profiles Directory
        </Link>
      </div>
    );
  }

  const { lang } = useLanguage();

  const handleCopySummary = () => {
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

      if (profile.about) summary += `\nउमेदवाराचे मनोगत: "${profile.about}"`;
      if (includeContact) {
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
Family Background: ${profile.familyBackground || "Cultured"} family, Base: ${profile.culturalDetails?.nativePlace || profile.familyLocation || "Pune"}
Father: ${profile.fatherName || "—"} | Mother: ${profile.motherName || "—"}
Height: ${profile.height || "—"} | Diet: ${profile.diet || "—"}`;

      if (profile.about) summary += `\nAbout: "${profile.about}"`;
      if (includeContact) {
        summary += `\n\nCONTACT:
Phone: ${formatIndianPhone(profile.phone)}
Email: ${profile.email || "Not specified"}`;
      }
    }

    navigator.clipboard.writeText(summary);
    toast.success(
      includeContact
        ? lang === "mr"
          ? "संपर्क क्रमांकासह सारांश कॉपी केला"
          : "Summary copied with contact numbers"
        : lang === "mr"
        ? "गोपनीय सारांश कॉपी केला (संपर्क क्रमांक लपवला आहे)"
        : "Shareable summary copied (contacts hidden)"
    );
  };


  const handleStatusChange = async (s: ProfileStatus) => {
    try {
      await updateStatus(profile.id, s);
      toast.success(`Profile status changed to ${s}`);
      refetch();
    } catch {
      toast.error("Failed to update status");
    }
  };

  const handleSaveNotes = async () => {
    try {
      await updateProfile(profile.id, { adminNotes: notes });
      toast.success("Internal remarks saved");
      refetch();
    } catch {
      toast.error("Failed to save remarks");
    }
  };

  const handleDelete = async () => {
    try {
      await deleteProfile(profile.id);
      toast.success("Profile deleted permanently");
      router.push("/admin/profiles");
    } catch {
      toast.error("Could not delete profile");
    }
  };

  const initials = profile.fullName
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("");

  return (
    <div className="p-4 sm:p-8 max-w-[1280px] w-full mx-auto space-y-8">
      {/* Top Breadcrumb & Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[var(--line)] pb-5">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/profiles"
            className="p-2 -ml-2 text-[var(--ink-muted)] hover:text-[var(--ink)] transition-colors"
            aria-label="Back to profiles"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <span className="eyebrow block">CONFIDENTIAL CANDIDATE DOSSIER</span>
            <h1 className="font-serif text-2xl sm:text-3xl text-[var(--ink)] font-normal">
              {profile.fullName}
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleCopySummary}
            className="btn-secondary h-10 px-4 text-xs font-medium"
          >
            <Copy className="w-3.5 h-3.5" />
            <span>Copy Summary</span>
          </button>

          <Link
            href={`/admin/profiles/${profile.id}/edit`}
            className="btn-primary h-10 px-4 text-xs font-medium"
          >
            <Edit className="w-3.5 h-3.5" />
            <span>Edit Profile</span>
          </Link>

          <button
            type="button"
            onClick={() => setDeleteConfirm(true)}
            className="btn-destructive h-10 px-3 text-xs"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Roomy 2-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Portrait & Key Facts */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-[var(--surface)] border border-[var(--line)] rounded-[var(--radius-card)] p-6 shadow-xs text-center space-y-4">
            {profile.photoUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={profile.photoUrl}
                alt={profile.fullName}
                className="w-32 h-32 rounded-2xl mx-auto object-cover border border-[var(--line)] shadow-sm"
              />
            ) : (
              <div className="w-32 h-32 rounded-2xl mx-auto bg-[var(--accent-soft)] text-[var(--accent)] font-serif text-4xl flex items-center justify-center font-normal border border-[#F0D5D8]">
                {initials}
              </div>
            )}

            <div>
              <h2 className="font-serif text-2xl text-[var(--ink)] font-normal">
                {profile.fullName}
              </h2>
              <span className="text-sm text-[var(--ink-muted)] block mt-1">
                {profile.profession}
              </span>
            </div>

            <div className="pt-2">
              <StatusBadge status={profile.status} />
            </div>

            <div className="pt-4 border-t border-[var(--line)] text-left space-y-3 text-xs">
              <div className="flex justify-between">
                <span className="text-[var(--ink-muted)]">Age &amp; DOB</span>
                <span className="font-medium text-[var(--ink)] tabular-nums">
                  {profile.age} yrs ({profile.dateOfBirth})
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--ink-muted)]">Location</span>
                <span className="font-medium text-[var(--ink)]">
                  {profile.location}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--ink-muted)]">Marital Status</span>
                <span className="font-medium text-[var(--ink)]">
                  {profile.maritalStatus}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--ink-muted)]">Direct Phone</span>
                <span className="font-medium text-[var(--ink)] tabular-nums">
                  {formatIndianPhone(profile.phone)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--ink-muted)]">Email</span>
                <span className="font-medium text-[var(--ink)]">
                  {profile.email || "—"}
                </span>
              </div>
            </div>
          </div>

          {/* Status Quick Select */}
          <div className="bg-[var(--surface)] border border-[var(--line)] rounded-[var(--radius-card)] p-5 shadow-xs space-y-3">
            <span className="eyebrow block">LIFECYCLE STATUS</span>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {(["new", "active", "matched", "inactive", "closed"] as ProfileStatus[]).map(
                (st) => (
                  <button
                    key={st}
                    type="button"
                    onClick={() => handleStatusChange(st)}
                    className={`py-2 px-3 rounded-lg border text-left font-medium transition-colors ${
                      profile.status === st
                        ? "bg-[var(--accent-soft)] border-[var(--accent)] text-[var(--accent)]"
                        : "bg-[var(--surface-2)] border-transparent hover:border-[var(--line)] text-[var(--ink)]"
                    }`}
                  >
                    {st.charAt(0).toUpperCase() + st.slice(1)}
                  </button>
                )
              )}
            </div>
          </div>

          {/* Internal Matchmaker Notes */}
          <div className="bg-[var(--surface)] border border-[var(--line)] rounded-[var(--radius-card)] p-5 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="eyebrow">PRIVATE NOTES</span>
              <button
                type="button"
                onClick={handleSaveNotes}
                className="text-xs text-[var(--accent)] hover:underline font-medium"
              >
                Save
              </button>
            </div>
            <textarea
              rows={4}
              value={notes || profile.adminNotes || ""}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Matchmaker confidential observations..."
              className="w-full p-3 rounded-lg border border-[var(--line)] bg-[var(--surface-2)]/40 text-xs text-[var(--ink)] leading-relaxed focus:bg-[var(--surface)]"
            />
          </div>
        </div>

        {/* Right Column: Detailed Sections */}
        <div className="lg:col-span-8 space-y-6">
          {/* Controlled Sharing Box */}
          <div className="bg-[var(--surface-2)] border border-[var(--line)] rounded-[var(--radius-card)] p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <label className="flex items-center gap-2 cursor-pointer text-xs text-[var(--ink-muted)]">
              <input
                type="checkbox"
                checked={includeContact}
                onChange={(e) => setIncludeContact(e.target.checked)}
                className="rounded border-[var(--line)] text-[var(--accent)] focus:ring-[var(--accent)]"
              />
              <span>Include candidate phone and email in generated summary</span>
            </label>
            <button
              type="button"
              onClick={handleCopySummary}
              className="btn-primary h-8 px-3.5 text-xs"
            >
              Copy Summary
            </button>
          </div>

          {/* Education & Career */}
          <div className="bg-[var(--surface)] border border-[var(--line)] rounded-[var(--radius-card)] p-6 shadow-xs space-y-4">
            <span className="eyebrow block">01 — EDUCATION &amp; CAREER</span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-xs text-[var(--ink-muted)] block">
                  Highest Degree
                </span>
                <span className="font-semibold text-[var(--ink)]">
                  {profile.education}
                </span>
              </div>
              <div>
                <span className="text-xs text-[var(--ink-muted)] block">
                  College / Alma Mater
                </span>
                <span className="font-medium text-[var(--ink)]">
                  {profile.institution || "Not specified"}
                </span>
              </div>
              <div>
                <span className="text-xs text-[var(--ink-muted)] block">
                  Profession / Role
                </span>
                <span className="font-semibold text-[var(--ink)]">
                  {profile.profession}
                </span>
              </div>
              <div>
                <span className="text-xs text-[var(--ink-muted)] block">
                  Company / Organization
                </span>
                <span className="font-medium text-[var(--ink)]">
                  {profile.company || "—"}
                </span>
              </div>
              <div>
                <span className="text-xs text-[var(--ink-muted)] block">
                  Annual Compensation
                </span>
                <span className="font-medium text-[var(--ink)]">
                  {profile.income || "Prefer not to disclose"}
                </span>
              </div>
            </div>
          </div>

          {/* Family Particulars */}
          <div className="bg-[var(--surface)] border border-[var(--line)] rounded-[var(--radius-card)] p-6 shadow-xs space-y-4">
            <span className="eyebrow block">02 — FAMILY PARTICULARS</span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-xs text-[var(--ink-muted)] block">
                  Father
                </span>
                <span className="font-medium text-[var(--ink)]">
                  {profile.fatherName || "—"}
                </span>
              </div>
              <div>
                <span className="text-xs text-[var(--ink-muted)] block">
                  Mother
                </span>
                <span className="font-medium text-[var(--ink)]">
                  {profile.motherName || "—"}
                </span>
              </div>
              <div>
                <span className="text-xs text-[var(--ink-muted)] block">
                  Family Structure
                </span>
                <span className="font-medium text-[var(--ink)]">
                  {profile.familyBackground
                    ? `${profile.familyBackground} Family`
                    : "—"}
                </span>
              </div>
              <div>
                <span className="text-xs text-[var(--ink-muted)] block">
                  Family Native / Base
                </span>
                <span className="font-medium text-[var(--ink)]">
                  {profile.familyLocation || "—"}
                </span>
              </div>
              <div className="sm:col-span-2">
                <span className="text-xs text-[var(--ink-muted)] block">
                  Siblings
                </span>
                <span className="font-medium text-[var(--ink)]">
                  {profile.siblings || "None"}
                </span>
              </div>
            </div>
          </div>

          {/* Maharashtra Cultural & Astrological Details (Optional) */}
          {profile.culturalDetails && (
            <div className="bg-[var(--surface)] border border-[var(--line)] rounded-[var(--radius-card)] p-6 shadow-xs space-y-4">
              <span className="eyebrow block">
                {lang === "mr" ? "सांस्कृतिक व पत्रिका तपशील" : "CULTURAL & ASTROLOGICAL DETAILS"}
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                {profile.culturalDetails.nativePlace && (
                  <div>
                    <span className="text-xs text-[var(--ink-muted)] block">
                      {lang === "mr" ? "मूळ गाव" : "Native Place"}
                    </span>
                    <span className="font-medium text-[var(--ink)]">
                      {profile.culturalDetails.nativePlace}
                    </span>
                  </div>
                )}
                {profile.culturalDetails.birthPlace && (
                  <div>
                    <span className="text-xs text-[var(--ink-muted)] block">
                      {lang === "mr" ? "जन्मस्थळ" : "Birth Place"}
                    </span>
                    <span className="font-medium text-[var(--ink)]">
                      {profile.culturalDetails.birthPlace}
                    </span>
                  </div>
                )}
                {profile.culturalDetails.birthTime && (
                  <div>
                    <span className="text-xs text-[var(--ink-muted)] block">
                      {lang === "mr" ? "जन्मवेळ" : "Birth Time"}
                    </span>
                    <span className="font-medium text-[var(--ink)]">
                      {profile.culturalDetails.birthTime}
                    </span>
                  </div>
                )}
                {profile.culturalDetails.rashi && (
                  <div>
                    <span className="text-xs text-[var(--ink-muted)] block">
                      {lang === "mr" ? "रास" : "Rashi"}
                    </span>
                    <span className="font-medium text-[var(--ink)]">
                      {profile.culturalDetails.rashi}
                    </span>
                  </div>
                )}
                {profile.culturalDetails.nakshatra && (
                  <div>
                    <span className="text-xs text-[var(--ink-muted)] block">
                      {lang === "mr" ? "नक्षत्र" : "Nakshatra"}
                    </span>
                    <span className="font-medium text-[var(--ink)]">
                      {profile.culturalDetails.nakshatra}
                    </span>
                  </div>
                )}
                {profile.culturalDetails.kuldaivat && (
                  <div>
                    <span className="text-xs text-[var(--ink-muted)] block">
                      {lang === "mr" ? "कुलदैवत" : "Kuldaivat"}
                    </span>
                    <span className="font-medium text-[var(--ink)]">
                      {profile.culturalDetails.kuldaivat}
                    </span>
                  </div>
                )}
                {profile.culturalDetails.gotra && (
                  <div>
                    <span className="text-xs text-[var(--ink-muted)] block">
                      {lang === "mr" ? "गोत्र" : "Gotra"}
                    </span>
                    <span className="font-medium text-[var(--ink)]">
                      {profile.culturalDetails.gotra}
                    </span>
                  </div>
                )}
                {profile.culturalDetails.caste && (
                  <div>
                    <span className="text-xs text-[var(--ink-muted)] block">
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

          {/* Lifestyle & About */}
          <div className="bg-[var(--surface)] border border-[var(--line)] rounded-[var(--radius-card)] p-6 shadow-xs space-y-4">

            <span className="eyebrow block">03 — LIFESTYLE &amp; ABOUT</span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
              <div>
                <span className="text-xs text-[var(--ink-muted)] block">
                  Height
                </span>
                <span className="font-medium text-[var(--ink)]">
                  {profile.height || "—"}
                </span>
              </div>
              <div>
                <span className="text-xs text-[var(--ink-muted)] block">
                  Diet
                </span>
                <span className="font-medium text-[var(--ink)]">
                  {profile.diet || "—"}
                </span>
              </div>
              <div>
                <span className="text-xs text-[var(--ink-muted)] block">
                  Habits
                </span>
                <span className="font-medium text-[var(--ink)]">
                  Smoking: {profile.smoking || "No"} &bull; Alcohol:{" "}
                  {profile.drinking || "No"}
                </span>
              </div>
            </div>

            {profile.hobbies && profile.hobbies.length > 0 && (
              <div className="pt-2">
                <span className="text-xs text-[var(--ink-muted)] block mb-1.5">
                  Interests &amp; Pursuits
                </span>
                <div className="flex flex-wrap gap-2">
                  {profile.hobbies.map((h) => (
                    <span
                      key={h}
                      className="px-3 py-1 rounded-full text-xs bg-[var(--surface-2)] text-[var(--ink)] border border-[var(--line)]"
                    >
                      {h}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {profile.about && (
              <div className="pt-2 border-t border-[var(--line)]">
                <span className="text-xs text-[var(--ink-muted)] block mb-1">
                  Personal Narrative
                </span>
                <p className="italic text-[var(--ink)] leading-relaxed">
                  &ldquo;{profile.about}&rdquo;
                </p>
              </div>
            )}
          </div>

          {/* Partner Expectations */}
          <div className="bg-[var(--surface)] border border-[var(--line)] rounded-[var(--radius-card)] p-6 shadow-xs space-y-4">
            <span className="eyebrow block">04 — PARTNER EXPECTATIONS</span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-xs text-[var(--ink-muted)] block">
                  Age Range
                </span>
                <span className="font-medium text-[var(--ink)] tabular-nums">
                  {profile.partnerPreferences?.ageMin ?? 24} –{" "}
                  {profile.partnerPreferences?.ageMax ?? 32} years
                </span>
              </div>
              <div>
                <span className="text-xs text-[var(--ink-muted)] block">
                  Preferred Location
                </span>
                <span className="font-medium text-[var(--ink)]">
                  {profile.partnerPreferences?.location || "Flexible"}
                </span>
              </div>
              <div>
                <span className="text-xs text-[var(--ink-muted)] block">
                  Education Expectation
                </span>
                <span className="font-medium text-[var(--ink)]">
                  {profile.partnerPreferences?.education || "Graduate / Masters"}
                </span>
              </div>
              <div>
                <span className="text-xs text-[var(--ink-muted)] block">
                  Profession Expectation
                </span>
                <span className="font-medium text-[var(--ink)]">
                  {profile.partnerPreferences?.profession || "Any professional"}
                </span>
              </div>
              {profile.partnerPreferences?.other && (
                <div className="sm:col-span-2">
                  <span className="text-xs text-[var(--ink-muted)] block">
                    Specific Nuances
                  </span>
                  <p className="text-[var(--ink)] mt-1">
                    {profile.partnerPreferences.other}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Biodata Document */}
          <div className="bg-[var(--surface)] border border-[var(--line)] rounded-[var(--radius-card)] p-6 shadow-xs space-y-3">
            <span className="eyebrow block">05 — ATTACHED DOCUMENTS</span>
            {profile.biodataUrl ? (
              <div className="flex items-center justify-between p-4 bg-[var(--surface-2)]/60 border border-[var(--line)] rounded-xl">
                <div className="flex items-center gap-3">
                  <FileText className="w-6 h-6 text-[var(--accent)]" />
                  <div>
                    <span className="text-sm font-semibold text-[var(--ink)] block">
                      {profile.biodataFileName || "Candidate_Biodata.pdf"}
                    </span>
                    <span className="text-xs text-[var(--ink-muted)]">
                      PDF Document &bull; Private Matchmaker Vault
                    </span>
                  </div>
                </div>
                <a
                  href={profile.biodataUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary h-9 px-4 text-xs font-medium"
                >
                  Open PDF
                </a>
              </div>
            ) : (
              <div className="p-4 bg-[var(--surface-2)]/40 rounded-xl text-xs text-[var(--ink-muted)] flex items-center gap-2">
                <Lock className="w-4 h-4" />
                <span>No separate biodata PDF uploaded with this profile.</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="w-full max-w-[420px] bg-[var(--surface)] border border-[var(--line)] rounded-[var(--radius-card)] p-6 shadow-xl space-y-4">
            <span className="eyebrow text-[var(--danger)]">
              PERMANENT DELETION
            </span>
            <h3 className="font-serif text-xl font-normal text-[var(--ink)]">
              Delete profile permanently?
            </h3>
            <p className="text-xs text-[var(--ink-muted)] leading-relaxed">
              Are you sure you wish to delete all records for{" "}
              <strong>{profile.fullName}</strong>? This cannot be undone.
            </p>
            <div className="flex items-center justify-end gap-3 pt-3">
              <button
                type="button"
                onClick={() => setDeleteConfirm(false)}
                className="btn-secondary h-9 px-4 text-xs font-medium"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDelete}
                className="h-9 px-4 rounded-full bg-[var(--danger)] text-white hover:bg-[#8F1F1F] text-xs font-medium transition-colors"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
