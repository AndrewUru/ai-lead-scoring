import Link from "next/link";
import {
  RocketIcon,
  UsersIcon,
  BrainIcon,
  GithubIcon,
  PanelTopOpenIcon,
} from "lucide-react";

export default function Header() {
  return (
    <div className="flex flex-col gap-10 items-center text-center mt-10 px-4">
      <div className="flex items-center gap-4 text-sm text-muted-foreground">
        <UsersIcon className="w-5 h-5" />
        <span>Gestiona tus leads</span>
        <RocketIcon className="w-5 h-5" />
        <span>Impulsa con IA</span>
        <BrainIcon className="w-5 h-5" />
        <span>Hecho con Next.js + Supabase</span>
      </div>

      <h1 className="text-4xl md:text-5xl font-extrabold max-w-3xl">
        Convierte datos en decisiones inteligentes con IA
      </h1>

      <p className="text-gray-600 dark:text-gray-300 max-w-xl text-lg">
        Registra tus leads sin complicaciones, sepáralos por industria, cargo o
        canal, y pronto podrás descubrir cuáles valen oro gracias a la
        inteligencia artificial.
      </p>

      <div className="flex flex-wrap justify-center gap-4 mt-6">
        <Link
          href="/dashboard"
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition inline-flex items-center gap-2"
        >
          <PanelTopOpenIcon className="w-4 h-4" />
          Ir al Panel
        </Link>
        <a
          href="https://github.com/andrewuru/ai-lead-scoring"
          target="_blank"
          rel="noopener noreferrer"
          className="border px-6 py-2 rounded-md hover:bg-muted transition inline-flex items-center gap-2"
        >
          <GithubIcon className="w-4 h-4" />
          Ver en GitHub
        </a>
      </div>

      <div className="w-full p-[1px] bg-gradient-to-r from-transparent via-foreground/10 to-transparent my-8" />
    </div>
  );
}
