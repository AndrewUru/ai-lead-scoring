"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { ThemeSwitcher } from "@/components/theme-switcher";

import HeaderAuth from "@/components/header-auth-client";
import { hasEnvVars } from "@/utils/supabase/check-env-vars";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="w-full border-b border-b-foreground/10 bg-background z-50">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-4 font-semibold text-lg">
          <Link href="/" className="hover:underline">
            AI Lead Scoring
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-6 text-sm">
          <ThemeSwitcher />
          <Link href="/dashboard" className="hover:underline">
            Dashboard
          </Link>
          {hasEnvVars && <HeaderAuth />}
        </div>

        <div className="md:hidden flex items-center gap-3">
          <ThemeSwitcher />
          <button onClick={() => setIsOpen(!isOpen)} aria-label="Abrir menú">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden px-4 pb-4 flex flex-col gap-3 text-sm">
          <Link
            href="/dashboard"
            onClick={() => setIsOpen(false)}
            className="hover:underline"
          >
            Dashboard
          </Link>
          {hasEnvVars && <HeaderAuth />}
        </div>
      )}
    </header>
  );
}
