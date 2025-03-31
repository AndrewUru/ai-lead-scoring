"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";

type Props = {
  onLeadAdded: () => void | Promise<void>;
};

export default function UploadForm({ onLeadAdded }: Props) {
  const supabase = createClient();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    status: "nuevo",
    industry: "",
    company_size: "",
    job_title: "",
    location: "",
    source_platform: "",
    utm_source: "",
    utm_medium: "",
    utm_campaign: "",
    gclid: "",
  });

  const [message, setMessage] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    setForm((prev) => ({
      ...prev,
      utm_source: urlParams.get("utm_source") || "",
      utm_medium: urlParams.get("utm_medium") || "",
      utm_campaign: urlParams.get("utm_campaign") || "",
      gclid: urlParams.get("gclid") || "",
    }));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setMessage("Usuario no autenticado.");
      return;
    }

    const { error } = await supabase.from("leads").insert({
      ...form,
      user_id: user.id,
    });

    if (error) {
      console.error("Error al guardar lead:", error);
      setMessage("❌ Error al guardar el lead.");
    } else {
      setMessage("✅ Lead guardado con éxito.");
      setForm({
        name: "",
        email: "",
        phone: "",
        status: "nuevo",
        industry: "",
        company_size: "",
        job_title: "",
        location: "",
        source_platform: "",
        utm_source: "",
        utm_medium: "",
        utm_campaign: "",
        gclid: "",
      });
      onLeadAdded();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-xl mt-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input
          className="border p-2"
          placeholder="Nombre"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          className="border p-2"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          className="border p-2"
          placeholder="Teléfono"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
        />
        <select
          className="border p-2"
          value={form.status}
          onChange={(e) => setForm({ ...form, status: e.target.value })}
        >
          <option value="nuevo">Nuevo</option>
          <option value="contactado">Contactado</option>
          <option value="cerrado">Cerrado</option>
        </select>
        <input
          className="border p-2"
          placeholder="Industria"
          value={form.industry}
          onChange={(e) => setForm({ ...form, industry: e.target.value })}
        />
        <input
          className="border p-2"
          placeholder="Tamaño empresa"
          value={form.company_size}
          onChange={(e) => setForm({ ...form, company_size: e.target.value })}
        />
        <input
          className="border p-2"
          placeholder="Cargo"
          value={form.job_title}
          onChange={(e) => setForm({ ...form, job_title: e.target.value })}
        />
        <input
          className="border p-2"
          placeholder="Ubicación"
          value={form.location}
          onChange={(e) => setForm({ ...form, location: e.target.value })}
        />
        <input
          className="border p-2"
          placeholder="Fuente del lead (Google Ads, LinkedIn...)"
          value={form.source_platform}
          onChange={(e) =>
            setForm({ ...form, source_platform: e.target.value })
          }
        />
      </div>

      {/* Mostrar datos UTM solo si existen */}
      <div className="text-sm text-gray-500">
        {form.utm_source && <p>UTM Source: {form.utm_source}</p>}
        {form.utm_medium && <p>UTM Medium: {form.utm_medium}</p>}
        {form.utm_campaign && <p>UTM Campaign: {form.utm_campaign}</p>}
        {form.gclid && <p>GCLID: {form.gclid}</p>}
      </div>

      <button
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        type="submit"
      >
        Guardar lead
      </button>
      {message && <p className="text-sm text-green-600">{message}</p>}
    </form>
  );
}
