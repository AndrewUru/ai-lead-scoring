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

      {/* Lista de leads actualizada */}
      <div>
        <h2 className="text-xl font-semibold mt-6">Leads registrados</h2>
        {leads.length === 0 && <p>No hay leads aún.</p>}
        <ul className="mt-4 space-y-4">
          {leads.map((lead) => (
            <li key={lead.id} className="border p-4 rounded shadow-sm">
              <p>
                <strong>Nombre:</strong> {lead.name}
              </p>
              <p>
                <strong>Email:</strong> {lead.email}
              </p>
              <p>
                <strong>Teléfono:</strong> {lead.phone}
              </p>
              <p>
                <strong>Estado:</strong> {lead.status}
              </p>
              <p>
                <strong>Industria:</strong> {lead.industry}
              </p>
              <p>
                <strong>Tamaño empresa:</strong> {lead.company_size}
              </p>
              <p>
                <strong>Cargo:</strong> {lead.job_title}
              </p>
              <p>
                <strong>Ubicación:</strong> {lead.location}
              </p>
              <p>
                <strong>Fuente:</strong> {lead.source_platform}
              </p>
              <p>
                <strong>Score:</strong> {lead.score ?? "—"}
              </p>
              {lead.utm_source && (
                <p>
                  <strong>UTM Source:</strong> {lead.utm_source}
                </p>
              )}
              {lead.utm_medium && (
                <p>
                  <strong>UTM Medium:</strong> {lead.utm_medium}
                </p>
              )}
              {lead.utm_campaign && (
                <p>
                  <strong>UTM Campaign:</strong> {lead.utm_campaign}
                </p>
              )}
              {lead.gclid && (
                <p>
                  <strong>GCLID:</strong> {lead.gclid}
                </p>
              )}
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
