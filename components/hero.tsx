import Link from "next/link";
import { RocketIcon, UsersIcon, BrainIcon } from "lucide-react";

export default function Header() {
  return (
    <div className="flex flex-col gap-10 items-center text-center mt-10 px-4">
      <div className="flex items-center gap-4 text-sm text-muted-foreground">
        <UsersIcon className="w-5 h-5" />
        <span>Dashboard de Leads</span>
        <RocketIcon className="w-5 h-5" />
        <span>IA en desarrollo</span>
        <BrainIcon className="w-5 h-5" />
        <span>Supabase + Next.js</span>
      </div>

      <h1 className="text-4xl md:text-5xl font-extrabold max-w-3xl">
        Analiza, Segmenta y Prioriza tus Leads con IA
      </h1>

      <p className="text-gray-600 dark:text-gray-300 max-w-xl text-lg">
        Esta plataforma te permite registrar leads comerciales, segmentarlos
        según industria, cargo y fuente, y próximamente, aplicar inteligencia
        artificial para calcular automáticamente su potencial de conversión.
      </p>

      <div className="flex flex-wrap justify-center gap-4 mt-6">
        <Link
          href="/dashboard"
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
        >
          Ir al Panel
        </Link>
        <a
          href="https://github.com/tuusuario/ai-lead-scoring"
          target="_blank"
          rel="noopener noreferrer"
          className="border px-6 py-2 rounded-md hover:bg-muted transition"
        >
          Ver en GitHub
        </a>
      </div>

      <div className="w-full p-[1px] bg-gradient-to-r from-transparent via-foreground/10 to-transparent my-8" />
    </div>
  );
}
