"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export function WhyChooseUs() {
  const { t } = useLanguage();

  const pillars = [
    {
      title: t.whyUs.feature1Title,
      subtitle: t.whyUs.feature1Desc,
    },
    {
      title: t.whyUs.feature2Title,
      subtitle: t.whyUs.feature2Desc,
    },
    {
      title: t.whyUs.feature3Title,
      subtitle: t.whyUs.feature3Desc,
    },
  ];

  return (
    <section
      id="why-us"
      className="py-[clamp(4.5rem,10vw,8.5rem)] px-5 sm:px-8 md:px-12 max-w-[1280px] mx-auto w-full"
    >
      <div className="max-w-[760px] mb-12 sm:mb-16">
        <span className="eyebrow block mb-3 text-[var(--accent)] font-semibold">
          {t.whyUs.eyebrow}
        </span>
        <h2 className="font-serif text-[clamp(2rem,4.5vw,3.5rem)] leading-[1.12] tracking-[-0.02em] text-[var(--ink)]">
          {t.whyUs.heading}
        </h2>
      </div>

      <div className="divide-y divide-[var(--line)] border-y border-[var(--line)]">
        {pillars.map((pillar, i) => (
          <motion.div
            key={pillar.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.5,
              delay: i * 0.1,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="py-8 sm:py-10 flex flex-col md:flex-row md:items-baseline justify-between gap-4 sm:gap-8 group"
          >
            <h3 className="font-serif text-2xl sm:text-3xl text-[var(--ink)] group-hover:text-[var(--accent)] transition-colors font-normal md:w-1/2">
              {pillar.title}
            </h3>
            <p className="text-base sm:text-lg text-[var(--ink-muted)] leading-relaxed md:w-1/2">
              {pillar.subtitle}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
