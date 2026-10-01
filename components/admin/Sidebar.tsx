"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, Users, Settings, LogOut, X } from "lucide-react";
import { mockAuth } from "@/lib/data/mock-auth";
import { useLanguage } from "@/lib/i18n/LanguageContext";

interface SidebarProps {
  mobileOpen: boolean;
  onCloseMobile: () => void;
}

export function Sidebar({ mobileOpen, onCloseMobile }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const user = mockAuth.getSession();
  const { t, language } = useLanguage();

  const handleLogout = async () => {
    await mockAuth.logout();
    router.push("/admin/login");
  };

  const navItems = [
    {
      label: t.admin.dashboard,
      href: "/admin",
      icon: LayoutDashboard,
      active: pathname === "/admin",
    },
    {
      label: t.admin.profiles,
      href: "/admin/profiles",
      icon: Users,
      active: pathname.startsWith("/admin/profiles"),
    },
    {
      label: t.admin.settings,
      href: "/admin/settings",
      icon: Settings,
      active: pathname === "/admin/settings",
    },
  ];

  const sidebarContent = (
    <div className="flex flex-col justify-between h-full bg-[var(--surface)] border-r border-[var(--line)]">
      {/* Top: Wordmark & Navigation */}
      <div>
        <div className="h-16 px-6 flex items-center justify-between border-b border-[var(--line)]">
          <Link
            href="/admin"
            className="font-serif text-lg sm:text-xl tracking-[-0.02em] text-[var(--ink)] font-normal flex items-center gap-1.5"
          >
            <span>{t.admin.brand}</span>
            <span className="kesari-dot" />
          </Link>
          <span className="text-[10px] uppercase tracking-wider bg-[var(--surface-2)] text-[var(--ink-muted)] font-semibold px-2 py-0.5 rounded">
            {language === "mr" ? "प्रशासक" : "CRM"}
          </span>
        </div>

        <nav className="p-3 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onCloseMobile}
                className={`relative flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  item.active
                    ? "bg-[var(--accent-soft)] text-[var(--accent)] font-semibold"
                    : "text-[var(--ink-muted)] hover:bg-[var(--surface-2)] hover:text-[var(--ink)]"
                }`}
              >
                {/* 2px accent left indicator */}
                {item.active && (
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-[var(--accent)] rounded-r" />
                )}
                <Icon className="w-4 h-4 flex-shrink-0" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom: Matchmaker Info & Sign Out */}
      <div className="p-4 border-t border-[var(--line)]">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-9 h-9 rounded-full bg-[var(--accent-soft)] text-[var(--accent)] flex items-center justify-center font-serif font-medium text-sm flex-shrink-0">
            {user?.avatarInitials || "RK"}
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-xs font-semibold text-[var(--ink)] truncate">
              {user?.name || (language === "mr" ? "राधिका कुलकर्णी" : "Radhika Kulkarni")}
            </span>
            <span className="text-[11px] text-[var(--ink-muted)] truncate">
              {language === "mr" ? "वरिष्ठ मॅचमेकर" : "Principal Matchmaker"}
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={handleLogout}
          className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium text-[var(--ink-muted)] hover:text-[var(--danger)] hover:bg-[#FDF2F2] transition-colors cursor-pointer"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>{t.admin.logout}</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar (Fixed 240px) */}
      <aside className="hidden lg:block w-[240px] h-screen sticky top-0 flex-shrink-0 z-20">
        {sidebarContent}
      </aside>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-black/30 backdrop-blur-xs"
            onClick={onCloseMobile}
          />
          <div className="relative w-[260px] max-w-[80vw] h-full z-10 animate-in slide-in-from-left duration-200">
            <button
              type="button"
              onClick={onCloseMobile}
              className="absolute top-4 right-4 z-20 p-1 text-[var(--ink-muted)] hover:text-[var(--ink)]"
              aria-label="Close sidebar"
            >
              <X className="w-5 h-5" />
            </button>
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
}
