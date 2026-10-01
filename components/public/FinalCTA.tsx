"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { BRAND } from "@/lib/constants/brand";

export function FinalCTA() {
  const { t } = useLanguage();

  return (
    <section className="py-[clamp(5rem,12vw,9.5rem)] px-5 sm:px-8 md:px-12 max-w-[1280px] mx-auto w-full border-t border-[var(--line)]">
      <div className="flex flex-col items-center text-center max-w-[760px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-4 flex items-center gap-2"
        >
          <span className="kesari-dot" />
          <span className="eyebrow block text-[var(--accent)] font-semibold">
            {t.hero.eyebrow}
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="font-serif text-[clamp(2.25rem,5.5vw,4.25rem)] leading-[1.1] tracking-[-0.02em] text-[var(--ink)] mb-6 font-normal"
        >
          {t.finalCta.heading}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="text-lg sm:text-xl text-[var(--ink-muted)] mb-8 max-w-[54ch] leading-relaxed"
        >
          {t.finalCta.subheading}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center gap-4"
        >
          <Link
            href="/register"
            className="btn-primary btn-primary-hero group inline-flex items-center gap-3 text-lg"
          >
            <span>{t.finalCta.button}</span>
          </Link>

          <span className="text-sm text-[var(--ink-muted)]">
            {t.finalCta.phoneText} <strong className="text-[var(--ink)]">{BRAND.contact.displayPhone}</strong>
          </span>
        </motion.div>
      </div>
    </section>
  );
}
