"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Topbar } from "@/components/admin/Topbar";
import { mockAuth, MOCK_ADMIN_CREDENTIALS } from "@/lib/data/mock-auth";
import { BRAND } from "@/lib/constants/brand";

export default function AdminSettingsPage() {
  const router = useRouter();
  const user = mockAuth.getSession();

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newPassword.length < 8) {
      toast.error("New password must be at least 8 characters long");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("New password and confirmation do not match");
      return;
    }

    setIsUpdating(true);
    // Simulated credential update
    setTimeout(() => {
      setIsUpdating(false);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      toast.success("Matchmaker password updated successfully (Demo)");
    }, 400);
  };

  const handleSignOut = async () => {
    await mockAuth.logout();
    router.push("/admin/login");
  };

  return (
    <>
      <Topbar
        title="Settings &amp; Preferences"
        onOpenMobileSidebar={() => {}}
        showAddButton={false}
      />

      <main className="flex-1 p-4 sm:p-8 max-w-[800px] w-full mx-auto space-y-8">
        {/* Account Details */}
        <section className="bg-[var(--surface)] border border-[var(--line)] rounded-[var(--radius-card)] p-6 shadow-xs space-y-5">
          <span className="eyebrow block">AUTHENTICATED OPERATOR</span>
          <h2 className="font-serif text-xl text-[var(--ink)] font-normal">
            Matchmaker Account
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <span className="text-[var(--ink-muted)] block mb-1">
                Principal Matchmaker
              </span>
              <span className="font-medium text-sm text-[var(--ink)] block">
                {user?.name || MOCK_ADMIN_CREDENTIALS.name}
              </span>
            </div>

            <div>
              <span className="text-[var(--ink-muted)] block mb-1">
                Authorized Email
              </span>
              <span className="font-medium text-sm text-[var(--ink)] block">
                {user?.email || MOCK_ADMIN_CREDENTIALS.email}
              </span>
            </div>

            <div>
              <span className="text-[var(--ink-muted)] block mb-1">Role</span>
              <span className="font-medium text-sm text-[var(--ink)] block">
                {user?.role || MOCK_ADMIN_CREDENTIALS.role}
              </span>
            </div>

            <div>
              <span className="text-[var(--ink-muted)] block mb-1">
                Salon Base
              </span>
              <span className="font-medium text-sm text-[var(--ink)] block">
                {BRAND.contact.city}, India
              </span>
            </div>
          </div>
        </section>

        {/* Change Password UI */}
        <section className="bg-[var(--surface)] border border-[var(--line)] rounded-[var(--radius-card)] p-6 shadow-xs space-y-5">
          <span className="eyebrow block">CREDENTIAL MANAGEMENT</span>
          <h2 className="font-serif text-xl text-[var(--ink)] font-normal">
            Change Password
          </h2>

          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="currPass"
                className="block text-xs uppercase tracking-wider font-semibold text-[var(--ink-muted)] mb-1.5"
              >
                Current Password
              </label>
              <input
                id="currPass"
                type="password"
                required
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full h-11 px-3.5 rounded-lg border border-[var(--line)] bg-[var(--surface-2)]/30 text-sm text-[var(--ink)] focus:bg-[var(--surface)] focus:border-[var(--accent)]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="newPass"
                  className="block text-xs uppercase tracking-wider font-semibold text-[var(--ink-muted)] mb-1.5"
                >
                  New Password
                </label>
                <input
                  id="newPass"
                  type="password"
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="At least 8 characters"
                  className="w-full h-11 px-3.5 rounded-lg border border-[var(--line)] bg-[var(--surface-2)]/30 text-sm text-[var(--ink)] focus:bg-[var(--surface)] focus:border-[var(--accent)]"
                />
              </div>

              <div>
                <label
                  htmlFor="confirmPass"
                  className="block text-xs uppercase tracking-wider font-semibold text-[var(--ink-muted)] mb-1.5"
                >
                  Confirm New Password
                </label>
                <input
                  id="confirmPass"
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Repeat new password"
                  className="w-full h-11 px-3.5 rounded-lg border border-[var(--line)] bg-[var(--surface-2)]/30 text-sm text-[var(--ink)] focus:bg-[var(--surface)] focus:border-[var(--accent)]"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isUpdating}
                className="btn-primary h-10 px-5 text-xs font-medium"
              >
                {isUpdating ? "Updating Password..." : "Update Password"}
              </button>
            </div>
          </form>
        </section>

        {/* Sign Out Card */}
        <section className="bg-[var(--surface)] border border-[var(--line)] rounded-[var(--radius-card)] p-6 shadow-xs flex items-center justify-between">
          <div>
            <h3 className="font-serif text-lg text-[var(--ink)] font-normal">
              Sign out of this session
            </h3>
            <p className="text-xs text-[var(--ink-muted)] mt-0.5">
              Ensure you terminate session when using a shared terminal.
            </p>
          </div>

          <button
            type="button"
            onClick={handleSignOut}
            className="btn-destructive h-9 px-4 text-xs font-medium"
          >
            Sign Out
          </button>
        </section>
      </main>
    </>
  );
}
