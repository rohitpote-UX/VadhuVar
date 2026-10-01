"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { mockAuth } from "@/lib/data/mock-auth";

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    // TODO: Replace with real middleware or server-side auth session check
    const isLoginPage = pathname === "/admin/login";
    const isAuthenticated = mockAuth.isAuthenticated();

    if (!isAuthenticated && !isLoginPage) {
      router.replace("/admin/login");
    } else if (isAuthenticated && isLoginPage) {
      router.replace("/admin");
    } else {
      setChecked(true);
    }
  }, [pathname, router]);

  // Prevent flicker during check
  if (!checked && pathname !== "/admin/login") {
    return (
      <div className="min-h-screen bg-[var(--bg)] flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-[var(--accent)] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return <>{children}</>;
}
