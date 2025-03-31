"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";

export default function ProtectedPage() {
  const supabase = createClient();
  const [leads, setLeads] = useState<any[]>([]);

  const fetchLeads = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    const { data, error } = await supabase
      .from("leads")
      .select()
      .eq("user_id", user.id);

    if (!error && data) setLeads(data);
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  return (
    <div className="space-y-10">
      <div className="space-y-6 max-w-3xl mx-auto bg-white dark:bg-black/10 p-6 rounded-lg shadow-md border">
        <h1 className="text-3xl font-bold text-center">
          👋 Bienvenido/a a tu panel de análisis
        </h1>

        <p className="text-gray-600 dark:text-gray-300 text-center text-lg">
          Esta herramienta te permite gestionar todos tus{" "}
          <strong>leads comerciales</strong> de forma simple y potente. Registra
          cada contacto con datos clave como sector, cargo, empresa y fuente de
          captación.
        </p>

        <div className="bg-blue-50 dark:bg-blue-900/20 text-blue-900 dark:text-blue-100 p-4 rounded-md">
          <p>
            🔍 Próximamente: una inteligencia artificial evaluará
            automáticamente el <strong>Lead Score</strong> de cada contacto.
            Esto te ayudará a saber qué leads tienen más probabilidad de
            convertirse en clientes.
          </p>
        </div>

        <p className="text-gray-600 dark:text-gray-300">
          Usa el formulario para agregar nuevos leads, consulta las métricas
          clave del negocio y prioriza tus esfuerzos según el análisis de datos.
        </p>
      </div>

      {/* Aquí podrías reusar el dashboard con KPIs, tabla, cards, etc */}
    </div>
  );
}
