"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { mockAuth, MOCK_ADMIN_CREDENTIALS } from "@/lib/data/mock-auth";
import { BRAND } from "@/lib/constants/brand";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      await mockAuth.login(email, password);
      router.push("/admin");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Incorrect email or password."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const fillMockCredentials = () => {
    setEmail(MOCK_ADMIN_CREDENTIALS.email);
    setPassword(MOCK_ADMIN_CREDENTIALS.password);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-[var(--bg)] flex flex-col justify-center items-center px-4 py-12">
      <div className="w-full max-w-[400px]">
        {/* Wordmark and Header */}
        <div className="text-center mb-8">
          <Link
            href="/"
            className="font-serif text-3xl tracking-[-0.02em] text-[var(--ink)] hover:text-[var(--accent)] transition-colors inline-block mb-3"
          >
            {BRAND.name}
          </Link>
          <span className="eyebrow block mb-2">MANAGEMENT PORTAL</span>
          <h1 className="font-serif text-2xl font-normal text-[var(--ink)]">
            Admin sign in
          </h1>
        </div>

        {/* Login Card */}
        <div className="bg-[var(--surface)] border border-[var(--line)] rounded-[var(--radius-card)] p-6 sm:p-8 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div
                role="alert"
                className="p-3 rounded-lg bg-[#FDEDED] border border-[var(--danger)] text-xs text-[var(--danger)] leading-relaxed"
              >
                {error}
              </div>
            )}

            <div>
              <label
                htmlFor="adminEmail"
                className="block text-xs uppercase tracking-wider font-medium text-[var(--ink-muted)] mb-2"
              >
                Matchmaker Email
              </label>
              <input
                id="adminEmail"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@example.com"
                className="w-full h-12 px-4 rounded-[var(--radius-card)] bg-[var(--surface)] border border-[var(--line)] text-sm text-[var(--ink)] focus:border-[var(--accent)] transition-colors"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label
                  htmlFor="adminPassword"
                  className="text-xs uppercase tracking-wider font-medium text-[var(--ink-muted)]"
                >
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-xs text-[var(--ink-muted)] hover:text-[var(--ink)]"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
              <input
                id="adminPassword"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full h-12 px-4 rounded-[var(--radius-card)] bg-[var(--surface)] border border-[var(--line)] text-sm text-[var(--ink)] focus:border-[var(--accent)] transition-colors"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="btn-primary w-full justify-center h-12 text-sm font-medium"
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Signing in...
                </span>
              ) : (
                "Sign In to Console &rarr;"
              )}
            </button>
          </form>

          {/* Quick-fill helper for demo evaluation */}
          <div className="mt-6 pt-5 border-t border-[var(--line)] text-center">
            <button
              type="button"
              onClick={fillMockCredentials}
              className="text-xs text-[var(--accent)] hover:underline font-medium"
            >
              Fill demo credentials ({MOCK_ADMIN_CREDENTIALS.email})
            </button>
          </div>
        </div>

        <div className="mt-8 text-center text-xs text-[var(--ink-muted)]">
          <Link href="/" className="hover:text-[var(--ink)] transition-colors">
            &larr; Return to public salon
          </Link>
        </div>
      </div>
    </div>
  );
}
