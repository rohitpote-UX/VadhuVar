"use client";

import { use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { useProfile } from "@/lib/data/hooks";
import { ProfileForm } from "@/components/admin/ProfileForm";

export default function ProfileEditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const router = useRouter();
  const { profile, loading } = useProfile(resolvedParams.id);

  if (loading) {
    return (
      <div className="p-8 max-w-[800px] mx-auto space-y-6 animate-pulse">
        <div className="w-32 h-6 bg-[var(--line)] rounded" />
        <div className="h-96 bg-[var(--surface)] border border-[var(--line)] rounded-xl" />
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

  return (
    <div className="p-4 sm:p-8 max-w-[800px] w-full mx-auto space-y-6 pb-24">
      <div className="flex items-center gap-3 border-b border-[var(--line)] pb-5">
        <Link
          href={`/admin/profiles/${profile.id}`}
          className="p-2 -ml-2 text-[var(--ink-muted)] hover:text-[var(--ink)]"
          aria-label="Back to profile"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <span className="eyebrow block">EDIT CANDIDATE RECORD</span>
          <h1 className="font-serif text-2xl sm:text-3xl text-[var(--ink)] font-normal">
            Edit Particulars: {profile.fullName}
          </h1>
        </div>
      </div>

      <ProfileForm
        initialProfile={profile}
        onSuccess={() => {
          router.push(`/admin/profiles/${profile.id}`);
        }}
        onCancel={() => {
          router.push(`/admin/profiles/${profile.id}`);
        }}
      />
    </div>
  );
}
