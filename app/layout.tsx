import type { Metadata, Viewport } from "next";
import { Toaster } from "sonner";
import "./globals.css";
import { LanguageProvider } from "@/lib/i18n/LanguageContext";

export const metadata: Metadata = {
  title: "Vivaha Studio — Private Personal Matchmaking",
  description:
    "A private matchmaking salon. Profiles are stored with absolute confidentiality and reviewed personally by our matchmaker.",
  openGraph: {
    title: "Vivaha Studio — Private Personal Matchmaking",
    description:
      "A private matchmaking salon. Profiles are stored with absolute confidentiality and reviewed personally by our matchmaker.",
    siteName: "Vivaha Studio",
    locale: "mr_IN",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="mr"
      data-lang="mr"
    >
      <body className="min-h-screen bg-[var(--bg)] text-[var(--ink)] antialiased font-sans flex flex-col selection:bg-[var(--accent-soft)] selection:text-[var(--accent)]">
        <LanguageProvider>
          {children}
        </LanguageProvider>

        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: "#FFFFFF",
              color: "#14110F",
              border: "1px solid #E7E1D8",
              fontFamily: "var(--font-geist-sans), var(--font-noto-sans-devanagari), sans-serif",
              borderRadius: "12px",
              boxShadow: "0 12px 30px -10px rgba(20, 17, 15, 0.12)",
            },
          }}
        />
      </body>
    </html>
  );
}
