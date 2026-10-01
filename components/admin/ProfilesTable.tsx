"use client";

import { useState } from "react";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import {
  ArrowUpDown,
  MoreVertical,
  Eye,
  Edit,
  Trash2,
  ChevronLeft,
  ChevronRight,
  CheckCircle,
} from "lucide-react";
import { Profile, SortField, SortOption, ProfileStatus } from "@/types/profile";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { StatusBadge } from "./StatusBadge";
import { EmptyState } from "./EmptyState";

interface ProfilesTableProps {
  profiles: Profile[];
  total: number;
  page: number;
  pageSize: number;
  sort: SortOption;
  loading: boolean;
  onPageChange: (newPage: number) => void;
  onPageSizeChange: (newSize: number) => void;
  onSortChange: (newSort: SortOption) => void;
  onSelectProfile: (id: string) => void;
  onStatusChange: (id: string, newStatus: ProfileStatus) => void;
  onDeleteProfile: (id: string) => void;
  onClearFilters: () => void;
}

export function ProfilesTable({
  profiles,
  total,
  page,
  pageSize,
  sort,
  loading,
  onPageChange,
  onPageSizeChange,
  onSortChange,
  onSelectProfile,
  onStatusChange,
  onDeleteProfile,
  onClearFilters,
}: ProfilesTableProps) {
  const { lang } = useLanguage();
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);

  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  const handleSort = (field: SortField) => {
    if (sort.field === field) {
      onSortChange({
        field,
        order: sort.order === "asc" ? "desc" : "asc",
      });
    } else {
      onSortChange({ field, order: "asc" });
    }
  };

  return (
    <div className="bg-[var(--surface)] border border-[var(--line)] rounded-[var(--radius-card)] shadow-xs overflow-hidden">
      {/* Desktop & Tablet Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[var(--surface-2)]/60 border-b border-[var(--line)] text-xs uppercase tracking-wider font-semibold text-[var(--ink-muted)]">
              <th className="py-3.5 px-4">
                <button
                  type="button"
                  onClick={() => handleSort("fullName")}
                  className="flex items-center gap-1.5 hover:text-[var(--ink)] focus:outline-none"
                >
                  <span>{lang === "mr" ? "उमेदवार" : "Candidate"}</span>
                  <ArrowUpDown className="w-3.5 h-3.5" />
                </button>
              </th>
              <th className="py-3.5 px-4">
                <button
                  type="button"
                  onClick={() => handleSort("age")}
                  className="flex items-center gap-1.5 hover:text-[var(--ink)] focus:outline-none"
                >
                  <span>{lang === "mr" ? "वय" : "Age"}</span>
                  <ArrowUpDown className="w-3.5 h-3.5" />
                </button>
              </th>
              <th className="py-3.5 px-4">{lang === "mr" ? "लिंग" : "Gender"}</th>
              <th className="py-3.5 px-4">{lang === "mr" ? "स्थान" : "Location"}</th>
              <th className="py-3.5 px-4">{lang === "mr" ? "व्यवसाय" : "Profession"}</th>
              <th className="py-3.5 px-4">{lang === "mr" ? "स्थिती" : "Status"}</th>
              <th className="py-3.5 px-4">
                <button
                  type="button"
                  onClick={() => handleSort("createdAt")}
                  className="flex items-center gap-1.5 hover:text-[var(--ink)] focus:outline-none"
                >
                  <span>{lang === "mr" ? "नोंदणी" : "Added"}</span>
                  <ArrowUpDown className="w-3.5 h-3.5" />
                </button>
              </th>
              <th className="py-3.5 px-4 text-right">{lang === "mr" ? "क्रिया" : "Actions"}</th>
            </tr>
          </thead>


          <tbody className="divide-y divide-[var(--line)] text-sm">
            {loading ? (
              // Skeleton loading rows
              Array.from({ length: 8 }).map((_, i) => (
                <tr key={i} className="animate-pulse">
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-[var(--line)]" />
                      <div className="w-28 h-4 bg-[var(--line)] rounded" />
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="w-10 h-4 bg-[var(--line)] rounded" />
                  </td>
                  <td className="py-4 px-4">
                    <div className="w-14 h-4 bg-[var(--line)] rounded" />
                  </td>
                  <td className="py-4 px-4">
                    <div className="w-20 h-4 bg-[var(--line)] rounded" />
                  </td>
                  <td className="py-4 px-4">
                    <div className="w-24 h-4 bg-[var(--line)] rounded" />
                  </td>
                  <td className="py-4 px-4">
                    <div className="w-16 h-6 bg-[var(--line)] rounded-full" />
                  </td>
                  <td className="py-4 px-4">
                    <div className="w-16 h-4 bg-[var(--line)] rounded" />
                  </td>
                  <td className="py-4 px-4 text-right">
                    <div className="w-6 h-6 bg-[var(--line)] rounded ml-auto" />
                  </td>
                </tr>
              ))
            ) : profiles.length === 0 ? (
              <tr>
                <td colSpan={8} className="py-12">
                  <EmptyState onClearFilters={onClearFilters} />
                </td>
              </tr>
            ) : (
              profiles.map((profile) => {
                const initials = profile.fullName
                  .split(" ")
                  .map((n) => n[0])
                  .slice(0, 2)
                  .join("");

                let addedAgo = "";
                try {
                  addedAgo = formatDistanceToNow(new Date(profile.createdAt), {
                    addSuffix: true,
                  });
                  if (lang === "mr") {
                    addedAgo = "नुकतेच";
                  }
                } catch {
                  addedAgo = lang === "mr" ? "नुकतेच" : "Recently";
                }

                return (
                  <tr
                    key={profile.id}
                    onClick={() => onSelectProfile(profile.id)}
                    className="hover:bg-[var(--surface-2)] transition-colors cursor-pointer group"
                  >
                    {/* Name + Avatar */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        {profile.photoUrl &&
                        profile.photoUrl.startsWith("http") ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={profile.photoUrl}
                            alt=""
                            className="w-9 h-9 rounded-full object-cover border border-[var(--line)] flex-shrink-0"
                            onError={(e) => {
                              (e.target as HTMLElement).style.display = "none";
                            }}
                          />
                        ) : (
                          <div className="w-9 h-9 rounded-full bg-[var(--accent-soft)] text-[var(--accent)] font-serif text-xs font-semibold flex items-center justify-center flex-shrink-0">
                            {initials}
                          </div>
                        )}
                        <span className="font-semibold text-[var(--ink)] group-hover:text-[var(--accent)] transition-colors">
                          {profile.fullName}
                        </span>
                      </div>
                    </td>

                    {/* Age */}
                    <td className="py-3.5 px-4 tabular-nums text-[var(--ink-muted)]">
                      {profile.age} {lang === "mr" ? "वर्षे" : ""}
                    </td>

                    {/* Gender */}
                    <td className="py-3.5 px-4 text-[var(--ink-muted)]">
                      {lang === "mr"
                        ? profile.gender === "Female"
                          ? "वधू"
                          : "वर"
                        : profile.gender}

                    </td>

                    {/* Location */}
                    <td className="py-3.5 px-4 text-[var(--ink-muted)] truncate max-w-[140px]">
                      {profile.location.split(",")[0]}
                    </td>

                    {/* Profession */}
                    <td className="py-3.5 px-4 text-[var(--ink-muted)] truncate max-w-[180px]">
                      {profile.profession}
                    </td>

                    {/* Status */}
                    <td className="py-3.5 px-4">
                      <StatusBadge status={profile.status} size="sm" />
                    </td>

                    {/* Added */}
                    <td className="py-3.5 px-4 text-xs text-[var(--ink-muted)] tabular-nums">
                      {addedAgo}
                    </td>

                    {/* Actions Menu */}
                    <td
                      className="py-3.5 px-4 text-right relative"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <button
                        type="button"
                        onClick={() =>
                          setActiveMenuId(
                            activeMenuId === profile.id ? null : profile.id
                          )
                        }
                        className="p-1 rounded hover:bg-[var(--surface-2)] text-[var(--ink-muted)] hover:text-[var(--ink)]"
                        aria-label="Candidate actions"
                      >
                        <MoreVertical className="w-4 h-4" />
                      </button>

                      {activeMenuId === profile.id && (
                        <div className="absolute right-4 top-10 w-48 bg-[var(--surface)] border border-[var(--line)] rounded-lg shadow-lg py-1 z-30 text-left">
                          <button
                            type="button"
                            onClick={() => {
                              setActiveMenuId(null);
                              onSelectProfile(profile.id);
                            }}
                            className="w-full flex items-center gap-2 px-3 py-2 text-xs text-[var(--ink)] hover:bg-[var(--surface-2)]"
                          >
                            <Eye className="w-3.5 h-3.5 text-[var(--ink-muted)]" />
                            <span>{lang === "mr" ? "तपशील पहा" : "Quick View Dossier"}</span>
                          </button>
                          <Link
                            href={`/admin/profiles/${profile.id}/edit`}
                            className="w-full flex items-center gap-2 px-3 py-2 text-xs text-[var(--ink)] hover:bg-[var(--surface-2)]"
                          >
                            <Edit className="w-3.5 h-3.5 text-[var(--ink-muted)]" />
                            <span>{lang === "mr" ? "माहिती बदला" : "Edit Particulars"}</span>
                          </Link>
                          <button
                            type="button"
                            onClick={() => {
                              setActiveMenuId(null);
                              onStatusChange(
                                profile.id,
                                profile.status === "active"
                                  ? "matched"
                                  : "active"
                              );
                            }}
                            className="w-full flex items-center gap-2 px-3 py-2 text-xs text-[var(--ink)] hover:bg-[var(--surface-2)]"
                          >
                            <CheckCircle className="w-3.5 h-3.5 text-[var(--ink-muted)]" />
                            <span>
                              {lang === "mr"
                                ? profile.status === "active"
                                  ? "नाते जुळले म्हणून नोंदवा"
                                  : "सक्रिय करा"
                                : profile.status === "active"
                                ? "Mark as Matched"
                                : "Mark as Active"}
                            </span>
                          </button>
                          <div className="border-t border-[var(--line)] my-1" />
                          <button
                            type="button"
                            onClick={() => {
                              setActiveMenuId(null);
                              onDeleteProfile(profile.id);
                            }}
                            className="w-full flex items-center gap-2 px-3 py-2 text-xs text-[var(--danger)] hover:bg-[#FDEDED]"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>{lang === "mr" ? "प्रोफाइल हटवा" : "Delete Profile"}</span>
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Stacked Cards (below 768px) */}
      <div className="md:hidden divide-y divide-[var(--line)]">
        {loading ? (
          Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="p-4 space-y-2 animate-pulse">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[var(--line)]" />
                <div className="space-y-1 flex-1">
                  <div className="w-28 h-4 bg-[var(--line)] rounded" />
                  <div className="w-20 h-3 bg-[var(--line)] rounded" />
                </div>
              </div>
            </div>
          ))
        ) : profiles.length === 0 ? (
          <div className="p-6">
            <EmptyState onClearFilters={onClearFilters} />
          </div>
        ) : (
          profiles.map((profile) => {
            const initials = profile.fullName
              .split(" ")
              .map((n) => n[0])
              .slice(0, 2)
              .join("");

            return (
              <div
                key={profile.id}
                onClick={() => onSelectProfile(profile.id)}
                className="p-4 active:bg-[var(--surface-2)] transition-colors cursor-pointer flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-full bg-[var(--accent-soft)] text-[var(--accent)] font-serif text-sm font-semibold flex items-center justify-center flex-shrink-0">
                    {initials}
                  </div>
                  <div className="min-w-0">
                    <span className="font-semibold text-sm text-[var(--ink)] block truncate">
                      {profile.fullName}
                    </span>
                    <span className="text-xs text-[var(--ink-muted)] block truncate">
                      {profile.age} {lang === "mr" ? "वर्षे" : "yrs"} &bull; {profile.location.split(",")[0]}
                    </span>
                    <span className="text-xs text-[var(--ink-faint)] block truncate mt-0.5">
                      {profile.profession}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
                  <StatusBadge status={profile.status} size="sm" />
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Pagination Bar */}
      <div className="px-4 py-3 border-t border-[var(--line)] bg-[var(--surface-2)]/40 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[var(--ink-muted)]">
        <div className="flex items-center gap-2">
          <span>{lang === "mr" ? "प्रति पृष्ठ पंक्ती:" : "Rows per page:"}</span>
          <select
            value={pageSize}
            onChange={(e) => onPageSizeChange(Number(e.target.value))}
            className="h-8 px-2 rounded border border-[var(--line)] bg-[var(--surface)] text-xs text-[var(--ink)]"
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
          <span className="ml-2 tabular-nums">
            {lang === "mr" ? `पृष्ठ ${page} पैकी ${totalPages}` : `Page ${page} of ${totalPages}`}
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            disabled={page <= 1}
            onClick={() => onPageChange(page - 1)}
            className="p-1.5 rounded border border-[var(--line)] bg-[var(--surface)] disabled:opacity-40 hover:bg-[var(--surface-2)] transition-colors"
            aria-label="Previous page"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            disabled={page >= totalPages}
            onClick={() => onPageChange(page + 1)}
            className="p-1.5 rounded border border-[var(--line)] bg-[var(--surface)] disabled:opacity-40 hover:bg-[var(--surface-2)] transition-colors"
            aria-label="Next page"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

