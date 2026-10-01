"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export function HowItWorks() {
  const { t, language } = useLanguage();

  const steps = [
    {
      num: language === "mr" ? "०१" : "01",
      title: t.howItWorks.step1Title,
      description: t.howItWorks.step1Desc,
    },
    {
      num: language === "mr" ? "०२" : "02",
      title: t.howItWorks.step2Title,
      description: t.howItWorks.step2Desc,
    },
    {
      num: language === "mr" ? "०३" : "03",
      title: t.howItWorks.step3Title,
      description: t.howItWorks.step3Desc,
    },
  ];

  return (
    <section
      id="how-it-works"
      className="py-[clamp(4.5rem,10vw,8.5rem)] px-5 sm:px-8 md:px-12 max-w-[1280px] mx-auto w-full border-t border-[var(--line)]"
    >
      <div className="max-w-[820px] mb-12 sm:mb-16">
        <span className="eyebrow block mb-3 text-[var(--accent)] font-semibold">
          {t.howItWorks.eyebrow}
        </span>
        <h2 className="font-serif text-[clamp(2rem,4.5vw,3.5rem)] leading-[1.12] tracking-[-0.02em] text-[var(--ink)] mb-4">
          {t.howItWorks.heading}
        </h2>
        <p className="text-[1.0625rem] leading-[1.65] text-[var(--ink-muted)] max-w-[62ch]">
          {t.howItWorks.subheading}
        </p>
      </div>

      {/* 3-Column Hairline Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 border-t border-b border-[var(--line)]">
        {steps.map((step, idx) => (
          <motion.div
            key={step.num}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.05 }}
            transition={{
              duration: 0.6,
              delay: idx * 0.1,
              ease: [0.22, 1, 0.36, 1],
            }}
            className={`py-8 sm:py-12 flex flex-col justify-between ${
              idx !== 0 ? "md:border-l md:border-[var(--line)] md:pl-10" : ""
            } ${idx !== 2 ? "border-b border-[var(--line)] md:border-b-0" : ""} ${
              idx !== 2 ? "md:pr-10" : ""
            }`}
          >
            <div>
              <span className="font-serif text-5xl sm:text-6xl text-[var(--ink-faint)] tabular-nums block mb-6 font-light">
                {step.num}
              </span>
              <h3 className="font-serif text-xl sm:text-2xl text-[var(--ink)] mb-3 font-normal">
                {step.title}
              </h3>
              <p className="text-[1rem] leading-[1.65] text-[var(--ink-muted)]">
                {step.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-10 sm:mt-12 flex items-center">
        <Link
          href="/register"
          className="link-ghost text-base font-medium text-[var(--accent)] group"
        >
          <span>{t.hero.ctaPrimary}</span>
        </Link>
      </div>
    </section>
  );
}
