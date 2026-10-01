"use client";

import { ProfileStatus } from "@/types/profile";
import { useLanguage } from "@/lib/i18n/LanguageContext";

interface StatusBadgeProps {
  status: ProfileStatus;
  size?: "sm" | "md";
}

export function StatusBadge({ status, size = "md" }: StatusBadgeProps) {
  const { language } = useLanguage();

  const styles: Record<
    ProfileStatus,
    { bg: string; text: string; labelEn: string; labelMr: string }
  > = {
    new: {
      bg: "bg-[#FFF8E6] border border-[#F3DE9C]",
      text: "text-[#8E6108]",
      labelEn: "Needs Review",
      labelMr: "पुनरावलोकन आवश्यक",
    },
    active: {
      bg: "bg-[#EBF5EE] border border-[#CDE5D5]",
      text: "text-[var(--success)]",
      labelEn: "Active",
      labelMr: "सक्रिय",
    },
    inactive: {
      bg: "bg-[#F3EEE6] border border-[#E7E1D8]",
      text: "text-[var(--ink-muted)]",
      labelEn: "Inactive",
      labelMr: "निष्क्रिय",
    },
    matched: {
      bg: "bg-[var(--accent-soft)] border border-[#EAC2C8]",
      text: "text-[var(--accent)]",
      labelEn: "Matched",
      labelMr: "जुळलेली",
    },
    closed: {
      bg: "bg-[#ECE8E1] border border-[#DDD7CD]",
      text: "text-[#837B72]",
      labelEn: "Closed",
      labelMr: "बंद",
    },
  };

  const current = styles[status] || styles.new;
  const sizeClasses =
    size === "sm"
      ? "text-[11px] px-2 py-0.5"
      : "text-xs px-2.5 py-1";

  return (
    <span
      className={`inline-flex items-center font-medium rounded-full ${sizeClasses} ${current.bg} ${current.text}`}
    >
      {language === "mr" ? current.labelMr : current.labelEn}
    </span>
  );
}
