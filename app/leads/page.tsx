"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import UploadForm from "@/components/upload-form"; // ✅ correcto

export default function Page() {
  const [leads, setLeads] = useState<any[]>([]);
  const supabase = createClient();

  const fetchLeads = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    const { data, error } = await supabase
      .from("leads")
      .select()
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (!error) setLeads(data);
    else console.error("Error cargando leads:", error);
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Mis Leads</h1>

      {/* Formulario para agregar leads */}
      <UploadForm onLeadAdded={fetchLeads} />

      {/* Lista de leads */}
      <div>
        <h2 className="text-xl font-semibold mt-6">Leads registrados</h2>
        {leads.length === 0 && <p>No hay leads aún.</p>}
        <ul className="mt-4 space-y-2">
          {leads.map((lead) => (
            <li key={lead.id} className="border p-3 rounded">
              <p>
                <strong>Nombre:</strong> {lead.name}
              </p>
              <p>
                <strong>Email:</strong> {lead.email}
              </p>
              <p>
                <strong>Teléfono:</strong> {lead.phone}
              </p>
              <p className="text-xs text-gray-500">
                {new Date(lead.created_at).toLocaleString()}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
