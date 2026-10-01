"use client";

import { DashboardStats } from "@/types/profile";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n/LanguageContext";

interface StatusBreakdownProps {
  stats: DashboardStats;
}

export function StatusBreakdown({ stats }: StatusBreakdownProps) {
  const { t, language } = useLanguage();
  const total = stats.totalProfiles || 1;
  const newCount = stats.statusCounts.new || 0;
  const activeCount = stats.statusCounts.active || 0;
  const inactiveCount = stats.statusCounts.inactive || 0;
  const matchedCount = stats.statusCounts.matched || 0;
  const closedCount = stats.statusCounts.closed || 0;

  const activePct = Math.round((activeCount / total) * 100);
  const matchedPct = Math.round((matchedCount / total) * 100);
  const inactivePct = Math.round((inactiveCount / total) * 100);
  const closedPct = Math.round((closedCount / total) * 100);

  return (
    <div className="bg-[var(--surface)] border border-[var(--line)] rounded-[var(--radius-card)] p-6 shadow-xs flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="eyebrow block mb-1 text-[var(--accent)] font-semibold">
              {language === "mr" ? "पोर्टफोलिओ स्थिती" : "PORTFOLIO HEALTH"}
            </span>
            <h2 className="font-serif text-xl text-[var(--ink)] font-normal">
              {t.admin.statusBreakdown}
            </h2>
          </div>

          {newCount > 0 && (
            <Link
              href="/admin/profiles?status=new"
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-[#FFF8E6] text-[#8E6108] border border-[#F3DE9C] hover:bg-[#FFF3D1] transition-colors"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#D48806] animate-pulse" />
              <span>
                {newCount} {language === "mr" ? "पुनरावलोकन आवश्यक" : "Needs Review"}
              </span>
            </Link>
          )}
        </div>

        {/* Horizontal Stacked Bar */}
        <div className="w-full h-4 bg-[var(--surface-2)] rounded-full overflow-hidden flex my-5">
          <div
            style={{ width: `${activePct}%` }}
            className="bg-[#2F6B4F] h-full transition-all duration-500"
            title={`Active: ${activeCount} (${activePct}%)`}
          />
          <div
            style={{ width: `${matchedPct}%` }}
            className="bg-[var(--accent)] h-full transition-all duration-500"
            title={`Matched: ${matchedCount} (${matchedPct}%)`}
          />
          <div
            style={{ width: `${inactivePct}%` }}
            className="bg-[#A39B91] h-full transition-all duration-500"
            title={`Inactive: ${inactiveCount} (${inactivePct}%)`}
          />
          <div
            style={{ width: `${closedPct}%` }}
            className="bg-[#DDD7CD] h-full transition-all duration-500"
            title={`Closed: ${closedCount} (${closedPct}%)`}
          />
        </div>

        {/* Legend */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5 mb-1">
              <span className="w-2.5 h-2.5 rounded-full bg-[#2F6B4F]" />
              <span className="text-xs text-[var(--ink-muted)]">
                {t.admin.statusActive}
              </span>
            </div>
            <span className="text-lg font-serif tabular-nums text-[var(--ink)]">
              {activeCount}
              <span className="text-xs text-[var(--ink-muted)] font-sans ml-1">
                ({activePct}%)
              </span>
            </span>
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-1.5 mb-1">
              <span className="w-2.5 h-2.5 rounded-full bg-[var(--accent)]" />
              <span className="text-xs text-[var(--ink-muted)]">
                {t.admin.statusMatched}
              </span>
            </div>
            <span className="text-lg font-serif tabular-nums text-[var(--ink)]">
              {matchedCount}
              <span className="text-xs text-[var(--ink-muted)] font-sans ml-1">
                ({matchedPct}%)
              </span>
            </span>
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-1.5 mb-1">
              <span className="w-2.5 h-2.5 rounded-full bg-[#A39B91]" />
              <span className="text-xs text-[var(--ink-muted)]">
                {t.admin.statusInactive}
              </span>
            </div>
            <span className="text-lg font-serif tabular-nums text-[var(--ink)]">
              {inactiveCount}
              <span className="text-xs text-[var(--ink-muted)] font-sans ml-1">
                ({inactivePct}%)
              </span>
            </span>
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-1.5 mb-1">
              <span className="w-2.5 h-2.5 rounded-full bg-[#DDD7CD]" />
              <span className="text-xs text-[var(--ink-muted)]">
                {t.admin.statusClosed}
              </span>
            </div>
            <span className="text-lg font-serif tabular-nums text-[var(--ink)]">
              {closedCount}
              <span className="text-xs text-[var(--ink-muted)] font-sans ml-1">
                ({closedPct}%)
              </span>
            </span>
          </div>
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-[var(--line)] flex items-center justify-between text-xs text-[var(--ink-muted)]">
        <span>
          {language === "mr"
            ? `एकूण नोंदणीकृत पोर्टफोलिओ: ${stats.totalProfiles} स्थळे`
            : `Total Registered Portfolio: ${stats.totalProfiles} profiles`}
        </span>
        <Link
          href="/admin/profiles"
          className="text-[var(--accent)] hover:underline font-medium"
        >
          {t.admin.viewAll}
        </Link>
      </div>
    </div>
  );
}
