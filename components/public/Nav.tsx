"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { BRAND } from "@/lib/constants/brand";
import { useLanguage, LanguageSwitcher } from "@/lib/i18n/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { t, language } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { label: t.nav.howItWorks, href: "/#how-it-works" },
    { label: t.nav.privacy, href: "/#privacy" },
    { label: t.nav.whyUs, href: "/#why-us" },
    { label: t.nav.contact, href: "/#contact" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-colors duration-300 pt-[env(safe-area-inset-top)] ${
          scrolled || mobileMenuOpen
            ? "bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[var(--line)]"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <div className="max-w-[1280px] mx-auto px-5 sm:px-8 md:px-12 h-20 flex items-center justify-between gap-4">
          {/* Brand Wordmark */}
          <Link
            href="/"
            className="font-serif text-2xl sm:text-[1.625rem] tracking-[-0.02em] font-normal text-[var(--ink)] hover:text-[var(--accent)] transition-colors flex items-center gap-2"
          >
            <span>{t.nav.brand}</span>
            <span className="kesari-dot" title="महाराष्ट्र" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-7 text-[0.9375rem] font-medium text-[var(--ink-muted)]">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="hover:text-[var(--ink)] transition-colors"
              >
                {link.label}
              </Link>
            ))}

            {/* Language Switcher in Nav */}
            <LanguageSwitcher />

            <Link
              href="/register"
              className="inline-flex items-center justify-center bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-[#FAF7F2] rounded-full h-10 px-5 text-sm font-medium transition-all active:scale-98 shadow-sm"
            >
              {t.nav.register}
            </Link>
          </nav>

          {/* Mobile Right Controls: Language Switcher + Menu Toggle */}
          <div className="flex md:hidden items-center gap-2.5">
            <LanguageSwitcher />
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-[0.875rem] tracking-[0.06em] font-medium uppercase text-[var(--ink)] py-2 px-2.5 rounded-lg border border-[var(--line)] bg-[var(--surface)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? t.nav.close : t.nav.menu}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Full-Screen Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-30 bg-[var(--bg)] flex flex-col justify-between pt-28 pb-12 px-6 sm:px-10 md:hidden overflow-y-auto"
          >
            <div className="flex flex-col gap-6 pt-4">
              <div className="flex items-center justify-between pb-3 border-b border-[var(--line)]">
                <span className="eyebrow">
                  {language === "mr" ? "सुचालन (NAVIGATION)" : "NAVIGATION"}
                </span>
                <LanguageSwitcher />
              </div>
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="font-serif text-3xl sm:text-4xl text-[var(--ink)] hover:text-[var(--accent)] transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="pt-8 border-t border-[var(--line)] flex flex-col gap-5">
              <Link
                href="/register"
                onClick={() => setMobileMenuOpen(false)}
                className="btn-primary w-full justify-center text-center py-4 h-13"
              >
                {t.nav.register} &rarr;
              </Link>
              <div className="text-xs text-[var(--ink-muted)] flex justify-between items-center">
                <span>
                  {language === "mr" ? BRAND.contact.cityMr : BRAND.contact.city},{" "}
                  {language === "mr" ? BRAND.contact.stateMr : BRAND.contact.state}
                </span>
                <Link
                  href="/admin/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-[var(--ink-faint)] hover:text-[var(--ink-muted)] underline"
                >
                  {t.nav.adminPortal}
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
