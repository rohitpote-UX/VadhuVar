"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, Menu, Plus } from "lucide-react";
import { CommandSearch } from "./CommandSearch";

import { useLanguage, LanguageSwitcher } from "@/lib/i18n/LanguageContext";

interface TopbarProps {
  title: string;
  onOpenMobileSidebar: () => void;
  showAddButton?: boolean;
  onAddClick?: () => void;
}

export function Topbar({
  title,
  onOpenMobileSidebar,
  showAddButton = true,
  onAddClick,
}: TopbarProps) {
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const { t, language } = useLanguage();

  return (
    <>
      <header className="h-16 px-4 sm:px-8 border-b border-[var(--line)] bg-[var(--surface)] flex items-center justify-between sticky top-0 z-20 gap-3">
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Mobile Sidebar Hamburger */}
          <button
            type="button"
            onClick={onOpenMobileSidebar}
            className="lg:hidden p-2 -ml-2 text-[var(--ink-muted)] hover:text-[var(--ink)] cursor-pointer"
            aria-label="Open navigation sidebar"
          >
            <Menu className="w-5 h-5" />
          </button>

          <h1 className="font-serif text-xl sm:text-2xl text-[var(--ink)] font-normal">
            {title}
          </h1>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* Language Switcher */}
          <LanguageSwitcher />

          {/* Cmd+K Search Trigger */}
          <button
            type="button"
            onClick={() => setCommandPaletteOpen(true)}
            className="flex items-center gap-2 h-10 px-3.5 rounded-full border border-[var(--line)] bg-[var(--bg)] hover:bg-[var(--surface-2)] text-xs text-[var(--ink-muted)] hover:text-[var(--ink)] transition-colors cursor-pointer"
            aria-label="Search profiles"
          >
            <Search className="w-3.5 h-3.5" />
            <span className="hidden md:inline">
              {language === "mr" ? "शोधा..." : "Search profiles…"}
            </span>
            <kbd className="hidden sm:inline-block ml-1 text-[10px] bg-[var(--surface)] text-[var(--ink-muted)] px-1.5 py-0.5 rounded border border-[var(--line)] font-sans">
              ⌘K
            </kbd>
          </button>

          {/* Add Profile CTA */}
          {showAddButton && (
            <>
              {onAddClick ? (
                <button
                  type="button"
                  onClick={onAddClick}
                  className="btn-primary h-10 px-4 text-xs font-medium"
                >
                  <Plus className="w-4 h-4" />
                  <span className="hidden sm:inline">
                    {language === "mr" ? "नवीन नोंदणी" : "Add profile"}
                  </span>
                </button>
              ) : (
                <Link
                  href="/admin/profiles?action=add"
                  className="btn-primary h-10 px-4 text-xs font-medium"
                >
                  <Plus className="w-4 h-4" />
                  <span className="hidden sm:inline">
                    {language === "mr" ? "नवीन नोंदणी" : "Add profile"}
                  </span>
                </Link>
              )}
            </>
          )}
        </div>
      </header>

      {/* Global Command Palette */}
      <CommandSearch
        open={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
      />
    </>
  );
}
