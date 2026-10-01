"use client";

import { Suspense, useState, useEffect, useCallback } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { Topbar } from "@/components/admin/Topbar";
import { FilterBar } from "@/components/admin/FilterBar";
import { FilterChips } from "@/components/admin/FilterChips";
import { ProfilesTable } from "@/components/admin/ProfilesTable";
import { ProfileDrawer } from "@/components/admin/ProfileDrawer";
import { ProfileForm } from "@/components/admin/ProfileForm";
import { useProfiles, useProfileMutations, useDashboardStats } from "@/lib/data/hooks";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import {

  ProfileFilters,
  SortOption,
  Gender,
  ProfileStatus,
  MaritalStatus,
} from "@/types/profile";
import { toast } from "sonner";

function ProfilesContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Read initial states from URL query parameters
  const qParam = searchParams.get("q") || "";
  const pageParam = parseInt(searchParams.get("page") || "1", 10);
  const pageSizeParam = parseInt(searchParams.get("pageSize") || "20", 10);
  const sortFieldParam = (searchParams.get("sortField") || "createdAt") as SortOption["field"];
  const sortOrderParam = (searchParams.get("sortOrder") || "desc") as SortOption["order"];
  const profileIdParam = searchParams.get("profile");
  const actionParam = searchParams.get("action");

  const [searchQuery, setSearchQuery] = useState(qParam);
  const [debouncedQuery, setDebouncedQuery] = useState(qParam);
  const [page, setPage] = useState(pageParam);
  const [pageSize, setPageSize] = useState(pageSizeParam);
  const [sort, setSort] = useState<SortOption>({
    field: sortFieldParam,
    order: sortOrderParam,
  });

  const [filters, setFilters] = useState<ProfileFilters>(() => {
    const f: ProfileFilters = {};
    const gender = searchParams.get("gender");
    if (gender) f.gender = gender.split(",") as Gender[];
    const status = searchParams.get("status");
    if (status) f.statuses = status.split(",") as ProfileStatus[];
    const location = searchParams.get("location");
    if (location) f.locations = location.split(",");
    const ageMin = searchParams.get("ageMin");
    if (ageMin) f.ageMin = parseInt(ageMin, 10);
    const ageMax = searchParams.get("ageMax");
    if (ageMax) f.ageMax = parseInt(ageMax, 10);
    return f;
  });

  const [selectedProfileId, setSelectedProfileId] = useState<string | null>(
    profileIdParam
  );
  const [addModalOpen, setAddModalOpen] = useState(actionParam === "add");

  // Keep debounced query synchronized
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
      setPage(1);
    }, 250);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Sync state changes back to URL query string
  const updateUrlParams = useCallback(
    (newParams: Record<string, string | null>) => {
      const current = new URLSearchParams(Array.from(searchParams.entries()));
      Object.entries(newParams).forEach(([k, v]) => {
        if (v === null || v === "") {
          current.delete(k);
        } else {
          current.set(k, v);
        }
      });
      const query = current.toString();
      router.replace(`${pathname}${query ? `?${query}` : ""}`, {
        scroll: false,
      });
    },
    [pathname, router, searchParams]
  );

  // Sync drawer ID with URL
  useEffect(() => {
    setSelectedProfileId(searchParams.get("profile"));
    if (searchParams.get("action") === "add") {
      setAddModalOpen(true);
    }
  }, [searchParams]);

  // Query profiles from repository hook
  const { items, total, loading, refetch } = useProfiles({
    q: debouncedQuery,
    filters,
    sort,
    page,
    pageSize,
  });

  const { stats } = useDashboardStats();
  const { updateStatus, deleteProfile } = useProfileMutations();

  const handleOpenDrawer = (id: string) => {
    setSelectedProfileId(id);
    updateUrlParams({ profile: id });
  };

  const handleCloseDrawer = () => {
    setSelectedProfileId(null);
    updateUrlParams({ profile: null });
  };

  const handleFilterChange = (newFilters: ProfileFilters) => {
    setFilters(newFilters);
    setPage(1);
    updateUrlParams({
      gender: newFilters.gender?.join(",") || null,
      status: newFilters.statuses?.join(",") || null,
      location: newFilters.locations?.join(",") || null,
      ageMin:
        newFilters.ageMin && newFilters.ageMin > 18
          ? String(newFilters.ageMin)
          : null,
      ageMax:
        newFilters.ageMax && newFilters.ageMax < 60
          ? String(newFilters.ageMax)
          : null,
      page: "1",
    });
  };

  const handleRemoveSingleFilter = (
    key: keyof ProfileFilters,
    value?: string
  ) => {
    if (key === "ageMin" || key === "ageMax") {
      const updated = { ...filters };
      delete updated[key];
      handleFilterChange(updated);
    } else if (Array.isArray(filters[key])) {
      const current = (filters[key] as string[]) || [];
      const updated = current.filter((item) => item !== value);
      handleFilterChange({ ...filters, [key]: updated });
    }
  };

  const handleClearAllFilters = () => {
    setSearchQuery("");
    setDebouncedQuery("");
    setFilters({});
    setPage(1);
    updateUrlParams({
      q: null,
      gender: null,
      status: null,
      location: null,
      ageMin: null,
      ageMax: null,
      page: "1",
    });
  };

  const handleSortChange = (newSort: SortOption) => {
    setSort(newSort);
    updateUrlParams({
      sortField: newSort.field,
      sortOrder: newSort.order,
    });
  };

  const handleStatusChange = async (id: string, newStatus: ProfileStatus) => {
    try {
      await updateStatus(id, newStatus);
      toast.success(`Profile updated to ${newStatus}`);
      refetch();
    } catch {
      toast.error("Failed to update status");
    }
  };

  const handleDeleteProfile = async (id: string) => {
    try {
      await deleteProfile(id);
      toast.success("Profile deleted permanently");
      refetch();
    } catch {
      toast.error("Failed to delete profile");
    }
  };

  const { lang } = useLanguage();


  return (
    <>
      <Topbar
        title={lang === "mr" ? "वधू-वर प्रोफाइल्स" : "Profiles Directory"}
        onOpenMobileSidebar={() => {}}
        showAddButton={true}
        onAddClick={() => setAddModalOpen(true)}
      />

      <main className="flex-1 p-4 sm:p-8 max-w-[1400px] w-full mx-auto space-y-5">
        {/* Search & Combinable Multi-Filter Bar */}
        <FilterBar
          searchQuery={searchQuery}
          onSearchChange={(q) => {
            setSearchQuery(q);
            updateUrlParams({ q: q || null });
          }}
          filters={filters}
          onFilterChange={handleFilterChange}
        />

        {/* Active Filter Chips & Counter */}
        <FilterChips
          filters={filters}
          totalMatches={total}
          totalProfiles={stats?.totalProfiles || 60}
          onRemoveFilter={handleRemoveSingleFilter}
          onClearAll={handleClearAllFilters}
        />

        {/* Profiles Table */}
        <ProfilesTable
          profiles={items}
          total={total}
          page={page}
          pageSize={pageSize}
          sort={sort}
          loading={loading}
          onPageChange={(p) => {
            setPage(p);
            updateUrlParams({ page: String(p) });
          }}
          onPageSizeChange={(ps) => {
            setPageSize(ps);
            setPage(1);
            updateUrlParams({ pageSize: String(ps), page: "1" });
          }}
          onSortChange={handleSortChange}
          onSelectProfile={handleOpenDrawer}
          onStatusChange={handleStatusChange}
          onDeleteProfile={handleDeleteProfile}
          onClearFilters={handleClearAllFilters}
        />
      </main>

      {/* Signature Profile Drawer */}
      <ProfileDrawer
        profileId={selectedProfileId}
        onClose={handleCloseDrawer}
        onProfileUpdated={refetch}
        onProfileDeleted={refetch}
      />

      {/* Add Profile Modal */}
      {addModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <div className="w-full max-w-[680px] max-h-[90vh] bg-[var(--surface)] border border-[var(--line)] rounded-[var(--radius-card)] shadow-xl overflow-hidden flex flex-col">
            <div className="p-5 border-b border-[var(--line)] flex items-center justify-between">
              <div>
                <span className="eyebrow block">
                  {lang === "mr" ? "थेट नोंदणी" : "DIRECT INTAKE"}
                </span>
                <h2 className="font-serif text-2xl text-[var(--ink)] font-normal">
                  {lang === "mr" ? "नवीन प्रोफाइल नोंदवा" : "Add New Profile"}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => {
                  setAddModalOpen(false);
                  updateUrlParams({ action: null });
                }}
                className="p-1 rounded text-[var(--ink-muted)] hover:text-[var(--ink)]"
              >
                &times;
              </button>
            </div>


            <div className="p-6 overflow-y-auto flex-1">
              <ProfileForm
                onSuccess={() => {
                  setAddModalOpen(false);
                  updateUrlParams({ action: null });
                  refetch();
                }}
                onCancel={() => {
                  setAddModalOpen(false);
                  updateUrlParams({ action: null });
                }}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default function ProfilesPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[var(--bg)] flex items-center justify-center">
          <div className="w-6 h-6 border-2 border-[var(--accent)] border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <ProfilesContent />
    </Suspense>
  );
}
