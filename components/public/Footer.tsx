"use client";

import Link from "next/link";
import { BRAND } from "@/lib/constants/brand";
import { useLanguage, LanguageSwitcher } from "@/lib/i18n/LanguageContext";

export function Footer() {
  const { t, language } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer
      id="contact"
      className="bg-[var(--surface)] border-t border-[var(--line)] pt-16 sm:pt-20 pb-12"
    >
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8 md:px-12">
        {/* Contact and Overview Block */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 pb-16 border-b border-[var(--line)]">
          <div className="md:col-span-6 flex flex-col justify-between">
            <div>
              <Link
                href="/"
                className="font-serif text-3xl tracking-[-0.02em] text-[var(--ink)] block mb-4"
              >
                {t.nav.brand}
              </Link>
              <p className="text-[1.0625rem] text-[var(--ink-muted)] leading-relaxed max-w-[44ch]">
                {language === "mr" ? BRAND.shortDescriptionMr : BRAND.shortDescriptionEn}
              </p>
            </div>
            <div className="mt-8 text-xs text-[var(--ink-muted)] space-y-1">
              <span className="font-medium text-[var(--ink)]">
                {language === "mr" ? "केवळ पूर्वसंमतीने प्रत्यक्ष भेट" : "Private Salon By Appointment Only"}
              </span>
              <br />
              <span>{language === "mr" ? BRAND.contact.addressMr : BRAND.contact.address}</span>
            </div>
          </div>

          <div className="md:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div>
              <span className="eyebrow block mb-3 text-[var(--accent)] font-semibold">
                {t.footer.contactHeading}
              </span>
              <p className="text-base text-[var(--ink)] font-medium mb-1">
                {BRAND.contact.phone}
              </p>
              <p className="text-sm text-[var(--ink-muted)] mb-4">
                {BRAND.contact.email}
              </p>
              <p className="text-xs text-[var(--ink-muted)] leading-normal">
                {language === "mr" ? BRAND.hoursMr : BRAND.hoursEn}
              </p>
            </div>

            <div>
              <span className="eyebrow block mb-3 text-[var(--accent)] font-semibold">
                {t.footer.quickLinks}
              </span>
              <ul className="space-y-2.5 text-sm text-[var(--ink-muted)]">
                <li>
                  <Link
                    href="/#how-it-works"
                    className="hover:text-[var(--ink)] transition-colors"
                  >
                    {t.nav.howItWorks}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/#privacy"
                    className="hover:text-[var(--ink)] transition-colors"
                  >
                    {t.nav.privacy}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/register"
                    className="hover:text-[var(--ink)] transition-colors"
                  >
                    {t.nav.register}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/admin/login"
                    className="hover:text-[var(--accent)] transition-colors"
                  >
                    {t.nav.adminPortal}
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[var(--ink-muted)]">
          <p>
            &copy; {currentYear} {t.nav.brand}. {t.footer.allRights}
          </p>

          <div className="flex items-center gap-6">
            <LanguageSwitcher />

            <Link
              href="/privacy"
              className="hover:text-[var(--ink)] transition-colors"
            >
              {t.footer.privacyPolicy}
            </Link>
            <Link
              href="/terms"
              className="hover:text-[var(--ink)] transition-colors"
            >
              {t.footer.termsOfService}
            </Link>
            <Link
              href="/admin/login"
              className="text-[var(--ink-faint)] hover:text-[var(--ink-muted)] transition-colors"
            >
              {t.footer.adminLogin}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
