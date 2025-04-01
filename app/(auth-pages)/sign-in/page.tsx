// app/sign-in/page.tsx
"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { createClient } from "@/utils/supabase/client";

export default function LoginForm() {
  const router = useRouter();
  const supabase = createClient();
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const email = (e.currentTarget as any).email.value;
    const password = (e.currentTarget as any).password.value;

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
    } else {
      router.push("/protected");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="email" placeholder="Email" />
      <input type="password" name="password" placeholder="Password" />
      <button type="submit">Iniciar sesión</button>
      {error && <p className="text-red-500">{error}</p>}
    </form>
  );
}
