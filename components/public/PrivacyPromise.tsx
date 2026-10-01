"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export function PrivacyPromise() {
  const { t } = useLanguage();

  const points = [
    {
      title: t.privacy.point1Title,
      detail: t.privacy.point1Desc,
    },
    {
      title: t.privacy.point2Title,
      detail: t.privacy.point2Desc,
    },
    {
      title: t.privacy.point3Title,
      detail: t.privacy.point3Desc,
    },
    {
      title: t.nav.privacy,
      detail: t.hero.privacyLine,
    },
  ];

  return (
    <section
      id="privacy"
      className="bg-[var(--surface-2)] py-[clamp(4.5rem,10vw,8.5rem)] border-y border-[var(--line)]"
    >
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Heading and Editorial Narrative */}
          <div className="lg:col-span-5 flex flex-col">
            <span className="eyebrow block mb-3 text-[var(--accent)] font-semibold">
              {t.privacy.eyebrow}
            </span>
            <h2 className="font-serif text-[clamp(2rem,4.5vw,3.5rem)] leading-[1.12] tracking-[-0.02em] text-[var(--ink)] mb-6 font-normal">
              {t.privacy.heading}
            </h2>
            <div className="space-y-4 text-[1.0625rem] leading-[1.7] text-[var(--ink-muted)]">
              <p>{t.privacy.subheading}</p>
            </div>
          </div>

          {/* Right Column: 2x2 Hairline Grid */}
          <div className="lg:col-span-7 bg-[var(--surface)] border border-[var(--line)] rounded-[var(--radius-card)] overflow-hidden shadow-sm">
            <div className="grid grid-cols-1 sm:grid-cols-2">
              {points.map((pt, i) => (
                <motion.div
                  key={pt.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.05 }}
                  transition={{
                    duration: 0.5,
                    delay: i * 0.08,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className={`p-6 sm:p-8 flex flex-col justify-between ${
                    i % 2 === 0 ? "sm:border-r sm:border-[var(--line)]" : ""
                  } ${i < 2 ? "border-b border-[var(--line)]" : ""}`}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <span className="kesari-dot" />
                    <h3 className="font-serif text-lg sm:text-xl text-[var(--ink)] font-normal">
                      {pt.title}
                    </h3>
                  </div>
                  <p className="text-sm sm:text-[0.9375rem] leading-relaxed text-[var(--ink-muted)]">
                    {pt.detail}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
