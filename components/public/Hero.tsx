"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { useLanguage } from "@/lib/i18n/LanguageContext";

const EDITORIAL_EASE = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const { t, language } = useLanguage();

  const lineVariants: Variants = {
    hidden: { y: "110%", opacity: 0 },
    visible: (i: number) => ({
      y: "0%",
      opacity: 1,
      transition: {
        duration: 0.8,
        delay: 0.15 + i * 0.1,
        ease: EDITORIAL_EASE,
      },
    }),
  };

  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: (delay = 0.4) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        delay,
        ease: EDITORIAL_EASE,
      },
    }),
  };

  return (
    <section className="relative min-h-[100svh] flex flex-col justify-between pt-32 sm:pt-40 pb-12 px-5 sm:px-8 md:px-12 max-w-[1280px] mx-auto w-full overflow-hidden">
      {/* Subtle decorative serif element in background */}
      <div
        aria-hidden="true"
        className="absolute top-1/2 right-4 -translate-y-1/2 pointer-events-none select-none font-serif text-[18rem] md:text-[28rem] font-light text-[#F3EEE6]/60 leading-none -z-10"
      >
        {language === "mr" ? "ॐ" : "&"}
      </div>

      <div className="flex-1 flex flex-col justify-center max-w-[960px]">
        {/* Eyebrow */}
        <motion.div
          custom={0.1}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="mb-4 sm:mb-6 flex items-center gap-2"
        >
          <span className="kesari-dot" />
          <span className="eyebrow inline-block tracking-[0.14em] text-[var(--accent)] font-semibold">
            {t.hero.eyebrow}
          </span>
        </motion.div>

        {/* Masked Line Reveal H1 */}
        <h1 className="font-serif font-normal text-[clamp(2.5rem,6.5vw,5.5rem)] leading-[1.12] sm:leading-[1.08] tracking-[-0.02em] text-[var(--ink)] mb-6 sm:mb-8">
          <span className="block overflow-hidden py-1">
            <motion.span
              custom={0}
              initial="hidden"
              animate="visible"
              variants={lineVariants}
              className="block"
            >
              {t.hero.headlineLine1}
            </motion.span>
          </span>
          <span className="block overflow-hidden py-1">
            <motion.span
              custom={1}
              initial="hidden"
              animate="visible"
              variants={lineVariants}
              className="block text-[var(--accent)]"
            >
              {t.hero.headlineLine2}
            </motion.span>
          </span>
        </h1>

        {/* Sub-copy */}
        <motion.p
          custom={0.4}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="text-[1.125rem] sm:text-[1.25rem] leading-[1.7] text-[var(--ink-muted)] max-w-[56ch] mb-8 sm:mb-10"
        >
          {t.hero.supporting}
        </motion.p>

        {/* CTA Group */}
        <motion.div
          custom={0.55}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 mb-8"
        >
          <Link
            href="/register"
            className="btn-primary btn-primary-hero group inline-flex items-center gap-3 text-base sm:text-lg"
          >
            <span>{t.hero.ctaPrimary}</span>
          </Link>

          <Link
            href="#how-it-works"
            className="link-ghost text-[1rem] py-2 px-1 text-[var(--ink)] font-medium"
          >
            {t.hero.ctaSecondary}
          </Link>
        </motion.div>

        {/* Quiet Trust Line with Lock Icon */}
        <motion.div
          custom={0.7}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="flex items-center gap-2.5 text-xs text-[var(--ink-muted)]"
        >
          <svg
            className="w-3.5 h-3.5 text-[var(--accent)] flex-shrink-0"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
          <span className="font-medium text-[var(--ink-muted)]">
            {t.hero.privacyLine}
          </span>
        </motion.div>
      </div>

      {/* Bottom Horizontal Stats Strip */}
      <motion.div
        custom={0.8}
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        className="mt-12 sm:mt-16 pt-8 border-t border-[var(--line)] grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8"
      >
        <div className="flex flex-col">
          <span className="font-serif text-2xl sm:text-3xl text-[var(--ink)] tabular-nums mb-1 font-normal">
            {t.hero.stat1Number}
          </span>
          <span className="text-xs uppercase tracking-wider text-[var(--ink)] font-semibold">
            {t.hero.stat1Title}
          </span>
          <span className="text-sm text-[var(--ink-muted)] mt-1">
            {t.hero.stat1Desc}
          </span>
        </div>

        <div className="flex flex-col sm:border-l sm:border-[var(--line)] sm:pl-8">
          <span className="font-serif text-2xl sm:text-3xl text-[var(--ink)] tabular-nums mb-1 font-normal">
            {t.hero.stat2Number}
          </span>
          <span className="text-xs uppercase tracking-wider text-[var(--ink)] font-semibold">
            {t.hero.stat2Title}
          </span>
          <span className="text-sm text-[var(--ink-muted)] mt-1">
            {t.hero.stat2Desc}
          </span>
        </div>

        <div className="flex flex-col sm:border-l sm:border-[var(--line)] sm:pl-8">
          <span className="font-serif text-2xl sm:text-3xl text-[var(--ink)] tabular-nums mb-1 font-normal">
            {t.hero.stat3Number}
          </span>
          <span className="text-xs uppercase tracking-wider text-[var(--ink)] font-semibold">
            {t.hero.stat3Title}
          </span>
          <span className="text-sm text-[var(--ink-muted)] mt-1">
            {t.hero.stat3Desc}
          </span>
        </div>
      </motion.div>
    </section>
  );
}
