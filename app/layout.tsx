import { useState } from "react";
import { Menu, X } from "lucide-react";
import HeaderAuth from "@/components/header-auth-client";
import Header from "@/components/header"; // ahora el header es cliente
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
              <Header /> {/* Nuevo componente cliente */}
              <div className="flex flex-col gap-10 w-full max-w-6xl px-5 py-10">
                {children}
              </div>
              {/* Footer moderno */}
              <footer className="w-full border-t py-10 flex flex-col items-center gap-3 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <span>Desarrollado con ❤️ por Andrés Tobío usando</span>
                  <a
                    href="https://supabase.com/"
                    target="_blank"
                    rel="noreferrer"
                    className="font-medium text-primary hover:underline"
                  >
                    Supabase
                  </a>
                  <span>y</span>
                  <a
                    href="https://nextjs.org/"
                    target="_blank"
                    rel="noreferrer"
                    className="font-medium text-primary hover:underline"
                  >
                    Next.js
                  </a>
                </div>
                <p className="text-xs">
                  © {new Date().getFullYear()} AI Lead Scoring. Todos los
                  derechos reservados.
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
