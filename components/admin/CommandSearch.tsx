"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Search, X, Users, LayoutDashboard, PlusCircle } from "lucide-react";
import { Profile } from "@/types/profile";
import { profilesRepository } from "@/lib/data/profiles.repository";
import { StatusBadge } from "./StatusBadge";

interface CommandSearchProps {
  open: boolean;
  onClose: () => void;
  onSelectProfile?: (profileId: string) => void;
}

export function CommandSearch({
  open,
  onClose,
  onSelectProfile,
}: CommandSearchProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Profile[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (open) {
      setQuery("");
      setResults([]);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  // Handle Cmd+K / Ctrl+K keyboard shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (open) onClose();
      } else if (e.key === "Escape" && open) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  // Debounced search
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    const timeout = setTimeout(async () => {
      try {
        const res = await profilesRepository.list({
          q: query.trim(),
          page: 1,
          pageSize: 6,
        });
        setResults(res.items);
      } catch {
        setResults([]);
      } finally {
        setIsSearching(false);
      }
    }, 200);

    return () => clearTimeout(timeout);
  }, [query]);

  if (!open) return null;

  const handleProfileClick = (id: string) => {
    onClose();
    if (onSelectProfile) {
      onSelectProfile(id);
    } else {
      router.push(`/admin/profiles?profile=${id}`);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-150">
      <div
        className="w-full max-w-[560px] bg-[var(--surface)] border border-[var(--line)] rounded-[var(--radius-card)] shadow-[var(--shadow-drawer)] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="relative flex items-center h-14 px-4 border-b border-[var(--line)]">
          <Search className="w-5 h-5 text-[var(--ink-muted)] flex-shrink-0 mr-3" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search profiles by name, phone, city, profession..."
            className="flex-1 bg-transparent text-base text-[var(--ink)] placeholder:text-[var(--ink-faint)] focus:outline-none"
          />
          {query ? (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="p-1 text-[var(--ink-muted)] hover:text-[var(--ink)]"
            >
              <X className="w-4 h-4" />
            </button>
          ) : (
            <kbd className="hidden sm:inline-block text-[10px] bg-[var(--surface-2)] text-[var(--ink-muted)] px-2 py-0.5 rounded border border-[var(--line)]">
              ESC
            </kbd>
          )}
        </div>

        {/* Content Results / Quick Actions */}
        <div className="max-h-[360px] overflow-y-auto p-2">
          {query.trim() ? (
            <div>
              <span className="eyebrow px-3 py-2 block text-[11px]">
                {isSearching
                  ? "SEARCHING PROFILES..."
                  : results.length > 0
                  ? `MATCHING PROFILES (${results.length})`
                  : "NO MATCHES FOUND"}
              </span>

              {results.map((profile) => (
                <button
                  key={profile.id}
                  type="button"
                  onClick={() => handleProfileClick(profile.id)}
                  className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-[var(--surface-2)] text-left transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-9 h-9 rounded-full bg-[var(--accent-soft)] text-[var(--accent)] font-serif text-sm flex items-center justify-center font-medium flex-shrink-0">
                      {profile.fullName
                        .split(" ")
                        .map((n) => n[0])
                        .slice(0, 2)
                        .join("")}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-[var(--ink)] truncate">
                          {profile.fullName}
                        </span>
                        <span className="text-xs text-[var(--ink-muted)] tabular-nums">
                          {profile.age} yrs
                        </span>
                      </div>
                      <span className="text-xs text-[var(--ink-muted)] truncate block">
                        {profile.profession} &bull; {profile.location}
                      </span>
                    </div>
                  </div>

                  <StatusBadge status={profile.status} size="sm" />
                </button>
              ))}
            </div>
          ) : (
            <div className="space-y-1">
              <span className="eyebrow px-3 py-1.5 block text-[11px]">
                QUICK ACTIONS
              </span>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  router.push("/admin");
                }}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-[var(--ink)] hover:bg-[var(--surface-2)] transition-colors text-left"
              >
                <LayoutDashboard className="w-4 h-4 text-[var(--ink-muted)]" />
                <span>Go to Dashboard</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  router.push("/admin/profiles");
                }}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-[var(--ink)] hover:bg-[var(--surface-2)] transition-colors text-left"
              >
                <Users className="w-4 h-4 text-[var(--ink-muted)]" />
                <span>Browse Profiles Directory</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  router.push("/admin/profiles?action=add");
                }}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-[var(--ink)] hover:bg-[var(--surface-2)] transition-colors text-left"
              >
                <PlusCircle className="w-4 h-4 text-[var(--accent)]" />
                <span className="text-[var(--accent)] font-medium">
                  + Add New Profile
                </span>
              </button>
            </div>
          )}
        </div>

        {/* Footer Shortcut Bar */}
        <div className="px-4 py-2 bg-[var(--surface-2)] border-t border-[var(--line)] flex items-center justify-between text-[11px] text-[var(--ink-muted)]">
          <span>Navigate with mouse or keyboard</span>
          <span>Press ESC to dismiss</span>
        </div>
      </div>
    </div>
  );
}
