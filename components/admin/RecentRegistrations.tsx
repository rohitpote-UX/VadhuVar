"use client";

import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { Profile } from "@/types/profile";
import { StatusBadge } from "./StatusBadge";
import { useLanguage } from "@/lib/i18n/LanguageContext";

interface RecentRegistrationsProps {
  profiles: Profile[];
  onSelectProfile: (id: string) => void;
}

export function RecentRegistrations({
  profiles,
  onSelectProfile,
}: RecentRegistrationsProps) {
  const { t, language } = useLanguage();
  const recent = profiles.slice(0, 6);

  return (
    <div className="bg-[var(--surface)] border border-[var(--line)] rounded-[var(--radius-card)] p-6 shadow-xs flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="eyebrow block mb-1 text-[var(--accent)] font-semibold">
              {language === "mr" ? "नवीन नोंदणी रांग" : "INTAKE QUEUE"}
            </span>
            <h2 className="font-serif text-xl text-[var(--ink)] font-normal">
              {t.admin.recentRegistrations}
            </h2>
          </div>

          <Link
            href="/admin/profiles"
            className="text-xs text-[var(--accent)] hover:underline font-semibold"
          >
            {t.admin.viewAll}
          </Link>
        </div>

        <div className="divide-y divide-[var(--line)]">
          {recent.map((profile) => {
            const initials = profile.fullName
              .split(" ")
              .map((n) => n[0])
              .slice(0, 2)
              .join("");

            let timeAgo = "";
            try {
              timeAgo = formatDistanceToNow(new Date(profile.createdAt), {
                addSuffix: true,
              });
            } catch {
              timeAgo = language === "mr" ? "नुकतेच" : "Recently";
            }

            return (
              <button
                key={profile.id}
                type="button"
                onClick={() => onSelectProfile(profile.id)}
                className="w-full flex items-center justify-between py-3.5 px-2 -mx-2 rounded-lg hover:bg-[var(--surface-2)] text-left transition-colors cursor-pointer group"
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="w-10 h-10 rounded-full bg-[var(--accent-soft)] text-[var(--accent)] font-serif text-sm flex items-center justify-center font-medium flex-shrink-0 group-hover:ring-1 group-hover:ring-[var(--accent)] transition-all">
                    {initials}
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-[var(--ink)] truncate group-hover:text-[var(--accent)] transition-colors">
                        {profile.fullName}
                      </span>
                      <span className="text-xs text-[var(--ink-muted)] tabular-nums">
                        {profile.age} {t.register.fields.yearsOld}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-[var(--ink-muted)] truncate">
                      <span>{profile.location.split(",")[0]}</span>
                      <span>&bull;</span>
                      <span className="truncate">{profile.profession}</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-1 flex-shrink-0 ml-3">
                  <StatusBadge status={profile.status} size="sm" />
                  <span className="text-[11px] text-[var(--ink-faint)] tabular-nums">
                    {timeAgo}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-[var(--line)] text-right">
        <span className="text-xs text-[var(--ink-muted)]">
          {language === "mr"
            ? "तपशील व टिपण पाहण्यासाठी प्रोफाइलवर क्लिक करा"
            : "Click any registration to view full dossier & notes"}
        </span>
      </div>
    </div>
  );
}
