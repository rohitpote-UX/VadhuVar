"use client";

import { useState } from "react";
import { Topbar } from "@/components/admin/Topbar";
import { StatCard } from "@/components/admin/StatCard";
import { StatusBreakdown } from "@/components/admin/StatusBreakdown";
import { RecentRegistrations } from "@/components/admin/RecentRegistrations";
import { ProfileDrawer } from "@/components/admin/ProfileDrawer";
import { useDashboardStats, useProfiles } from "@/lib/data/hooks";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function AdminDashboardPage() {
  const { t, language } = useLanguage();
  const { stats, loading: statsLoading, refetch: refetchStats } = useDashboardStats();
  const { items: profiles, loading: profilesLoading, refetch: refetchProfiles } = useProfiles({
    page: 1,
    pageSize: 6,
  });

  const [selectedProfileId, setSelectedProfileId] = useState<string | null>(null);

  const handleRefresh = () => {
    refetchStats();
    refetchProfiles();
  };

  return (
    <>
      <Topbar
        title={t.admin.dashboard}
        onOpenMobileSidebar={() => {}}
        showAddButton={true}
      />

      <main className="flex-1 p-4 sm:p-8 max-w-[1400px] w-full mx-auto space-y-8">
        {/* Metric Cards Row */}
        <section aria-label="Key Performance Metrics">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {statsLoading ? (
              Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="h-28 bg-[var(--surface)] border border-[var(--line)] rounded-[var(--radius-card)] animate-pulse"
                />
              ))
            ) : stats ? (
              <>
                <StatCard
                  label={t.admin.kpiTotal}
                  value={stats.totalProfiles}
                  deltaText={
                    language === "mr"
                      ? "सर्व सुरक्षित व खाजगी नोंदणी"
                      : "All confidential registrations"
                  }
                  deltaType="neutral"
                />
                <StatCard
                  label={t.admin.kpiNewWeek}
                  value={stats.newProfilesLast7Days}
                  deltaText={
                    language === "mr"
                      ? `+${stats.newProfilesLast7Days} या आठवड्यातील नवीन`
                      : `+${stats.newProfilesLast7Days} intake this week`
                  }
                  deltaType="highlight"
                />
                <StatCard
                  label={t.admin.kpiActive}
                  value={stats.activeProfiles}
                  deltaText={
                    language === "mr"
                      ? `${Math.round(
                          (stats.activeProfiles / (stats.totalProfiles || 1)) * 100
                        )}% सक्रिय स्थळे`
                      : `${Math.round(
                          (stats.activeProfiles / (stats.totalProfiles || 1)) * 100
                        )}% of current portfolio`
                  }
                  deltaType="positive"
                />
                <StatCard
                  label={t.admin.matchedProfiles}
                  value={stats.matchedProfiles}
                  deltaText={
                    language === "mr"
                      ? `${stats.matchedProfiles} यशस्वी नाती`
                      : `${stats.matchedProfiles} successfully matched`
                  }
                  deltaType="positive"
                />
              </>
            ) : null}
          </div>
        </section>

        {/* 2-Column Section: Recent Registrations & Status Breakdown */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-7">
            {profilesLoading ? (
              <div className="h-80 bg-[var(--surface)] border border-[var(--line)] rounded-[var(--radius-card)] animate-pulse" />
            ) : (
              <RecentRegistrations
                profiles={profiles}
                onSelectProfile={(id) => setSelectedProfileId(id)}
              />
            )}
          </div>

          <div className="lg:col-span-5">
            {statsLoading || !stats ? (
              <div className="h-80 bg-[var(--surface)] border border-[var(--line)] rounded-[var(--radius-card)] animate-pulse" />
            ) : (
              <StatusBreakdown stats={stats} />
            )}
          </div>
        </section>
      </main>

      {/* Global Profile Drawer */}
      <ProfileDrawer
        profileId={selectedProfileId}
        onClose={() => setSelectedProfileId(null)}
        onProfileUpdated={handleRefresh}
        onProfileDeleted={handleRefresh}
      />
    </>
  );
}
