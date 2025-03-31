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
      <h1 className="text-3xl font-bold">
        👋 Bienvenido a tu panel de análisis
      </h1>

      <p className="text-gray-500">
        Aquí puedes ver todos tus leads y sus puntuaciones generadas por IA.
      </p>

      {/* Aquí podrías reusar el dashboard con KPIs, tabla, cards, etc */}
    </div>
  );
}
