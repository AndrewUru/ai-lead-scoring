"use client";
import React from "react";

interface Props {
  name: string;
  email: string;
  score: string;
  created_at: string;
}

export default function LeadRow({ name, email, score, created_at }: Props) {
  const formattedDate = new Date(created_at).toLocaleString();

  return (
    <tr>
      <td className="border p-2">{name || "—"}</td>
      <td className="border p-2">{email || "—"}</td>
      <td className="border p-2">{score}</td>
      <td className="border p-2">{formattedDate}</td>
    </tr>
  );
}
