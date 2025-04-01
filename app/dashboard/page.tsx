"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import UploadForm from "@/app/leads/upload-form"; // Update the path to the correct location

export default function DashboardPage() {
  const supabase = createClient(); // ✅ Correcto
  const [leads, setLeads] = useState<any[]>([]);

  const fetchLeads = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    const { data } = await supabase
      .from("leads")
      .select()
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    setLeads(data || []);
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const total = leads.length;
  const nuevos = leads.filter((l) => l.status === "nuevo").length;
  const contacto = leads.filter((l) => l.status === "contactado").length;
  const cerrado = leads.filter((l) => l.status === "cerrado").length;
  const promedio = total
    ? (leads.reduce((acc, l) => acc + (l.score || 0), 0) / total).toFixed(2)
    : "—";

  return (
    <div className="space-y-10">
      <h1 className="text-3xl font-bold">📊 Resumen de Leads</h1>

      {/* KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        <Card title="Total" value={total} />
        <Card title="Nuevos" value={nuevos} />
        <Card title="Contactados" value={contacto} />
        <Card title="Cerrados" value={cerrado} />
        <Card title="Promedio Score" value={promedio} />
      </div>

      {/* Formulario para agregar leads */}
      <div>
        <h2 className="text-xl font-semibold">Agregar nuevo lead</h2>
        <UploadForm onLeadAdded={fetchLeads} />
      </div>

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

      {/* Tabla de leads recientes */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Últimos Leads</h2>
        <div className="overflow-auto rounded border">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-muted border-b">
              <tr>
                <th className="p-3">Nombre</th>
                <th className="p-3">Email</th>
                <th className="p-3">Teléfono</th>
                <th className="p-3">Industria</th>
                <th className="p-3">Cargo</th>
                <th className="p-3">Estado</th>
                <th className="p-3">Score</th>
                <th className="p-3">Fecha</th>
              </tr>
            </thead>
            <tbody>
              {leads.slice(0, 10).map((lead) => (
                <tr key={lead.id} className="border-b">
                  <td className="p-3">{lead.name}</td>
                  <td className="p-3">{lead.email}</td>
                  <td className="p-3">{lead.phone}</td>
                  <td className="p-3">{lead.industry}</td>
                  <td className="p-3">{lead.job_title}</td>
                  <td className="p-3 capitalize">{lead.status}</td>
                  <td className="p-3">{lead.score ?? "—"}</td>
                  <td className="p-3 text-xs text-gray-500">
                    {new Date(lead.created_at).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function Card({ title, value }: { title: string; value: string | number }) {
  return (
    <div className="p-4 border rounded shadow-sm bg-white dark:bg-black/10">
      <h3 className="text-sm text-gray-500 dark:text-gray-400">{title}</h3>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
}
