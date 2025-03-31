import HeaderAuth from "@/components/header-auth";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { hasEnvVars } from "@/utils/supabase/check-env-vars";
import { Geist } from "next/font/google";
import { ThemeProvider } from "next-themes";
import Link from "next/link";
import "./globals.css";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "AI Lead Scoring Dashboard",
  description:
    "Analiza leads y genera puntuaciones automáticas con inteligencia artificial usando Next.js y Supabase.",
};

const geistSans = Geist({
  display: "swap",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={geistSans.className} suppressHydrationWarning>
      <body className="bg-background text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <main className="min-h-screen flex flex-col items-center">
            <div className="flex-1 w-full flex flex-col items-center">
              <header className="w-full border-b border-b-foreground/10">
                <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3">
                  {/* Brand */}
                  <div className="flex items-center gap-4 font-semibold text-lg">
                    <Link href="/" className="hover:underline">
                      AI Lead Scoring
                    </Link>
                  </div>

                  {/* Desktop Nav */}
                  <div className="hidden md:flex items-center gap-6 text-sm">
                    <Link href="/dashboard" className="hover:underline">
                      Dashboard
                    </Link>
                    <Link href="/leads" className="hover:underline">
                      Leads
                    </Link>
                    {hasEnvVars && <HeaderAuth />}
                    <ThemeSwitcher />
                  </div>

                  {/* Mobile Menu (simple versión collapsible opcional) */}
                  <div className="md:hidden flex items-center gap-3">
                    <ThemeSwitcher />
                  </div>
                </div>

                {/* Nav extra para móviles (si lo necesitas más adelante, con menú desplegable) */}
              </header>

              {/* Contenido principal */}
              <div className="flex flex-col gap-10 w-full max-w-6xl px-5 py-10">
                {children}
              </div>

              {/* Footer */}
              <footer className="w-full border-t text-center text-xs py-10 flex flex-col items-center gap-3">
                <p>
                  Desarrollado con ❤️ usando{" "}
                  <a
                    href="https://supabase.com/"
                    target="_blank"
                    rel="noreferrer"
                    className="underline hover:text-primary"
                  >
                    Supabase
                  </a>{" "}
                  y{" "}
                  <a
                    href="https://nextjs.org/"
                    target="_blank"
                    rel="noreferrer"
                    className="underline hover:text-primary"
                  >
                    Next.js
                  </a>
                </p>
                <ThemeSwitcher />
              </footer>
            </div>
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
