import Link from "next/link";
import { Suspense } from "react";
import HeaderAuthClient from "./header-auth-client";

export default function Header() {
  return (
    <header className="w-full border-b">
      <div className="max-w-6xl mx-auto flex justify-between items-center px-4 py-3">
        <Link href="/" className="text-xl font-bold hover:underline">
          AI Lead Scoring
        </Link>

        <nav className="flex items-center gap-4">
          <Link href="/dashboard">Dashboard</Link>
          <Suspense fallback={<span>Cargando...</span>}>
            <HeaderAuthClient />
          </Suspense>
        </nav>
      </div>
    </header>
  );
}
