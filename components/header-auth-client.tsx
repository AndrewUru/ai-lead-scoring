"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function HeaderAuthClient() {
  const [email, setEmail] = useState<string | null>(null);
  const supabase = createClient();

  useEffect(() => {
    const fetchSession = async () => {
      const { data } = await supabase.auth.getSession();
      setEmail(data.session?.user.email ?? null);
    };

    fetchSession();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/sign-in";
  };

  if (!email) {
    return (
      <>
        <Link href="/sign-in">Iniciar Sesión</Link>
        <Link href="/sign-up">
          <Button variant="default">Registrarse</Button>
        </Link>
      </>
    );
  }

  return (
    <>
      <span className="text-sm text-muted-foreground">{email}</span>
      <Button variant="default" onClick={handleLogout}>
        Logout
      </Button>
    </>
  );
}
