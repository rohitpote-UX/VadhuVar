import Link from "next/link";
import { BRAND } from "@/lib/constants/brand";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--ink)] flex flex-col items-center justify-center px-6 text-center">
      <span className="eyebrow mb-3 block">404 — PAGE NOT FOUND</span>
      <h1 className="font-serif text-4xl sm:text-5xl font-normal mb-4">
        This page cannot be found.
      </h1>
      <p className="text-[var(--ink-muted)] max-w-[40ch] mb-8 leading-relaxed">
        The destination you are looking for either does not exist or requires
        private credentials.
      </p>
      <Link href="/" className="btn-primary">
        Return to {BRAND.name} &rarr;
      </Link>
    </div>
  );
}
