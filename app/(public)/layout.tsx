"use client";

import { usePathname } from "next/navigation";
import { Nav } from "@/components/public/Nav";
import { Footer } from "@/components/public/Footer";
import { SmoothScroll } from "@/components/public/SmoothScroll";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isRegisterFlow = pathname.startsWith("/register");

  return (
    <SmoothScroll>
      <div className="min-h-screen flex flex-col bg-[var(--bg)] text-[var(--ink)]">
        {!isRegisterFlow && <Nav />}
        <main className="flex-1">{children}</main>
        {!isRegisterFlow && <Footer />}
      </div>
    </SmoothScroll>
  );
}
