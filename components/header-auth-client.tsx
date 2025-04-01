// components/header-auth-client.tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { createClient } from "@/utils/supabase/client";
const supabase = createClient();

import { hasEnvVars } from "@/utils/supabase/check-env-vars";

export default function HeaderAuthClient() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
    };

    getUser();
  }, []);

  if (!hasEnvVars) {
    return (
      <div className="flex gap-4 items-center">
        <Badge variant="default" className="font-normal pointer-events-none">
          Please update .env.local file with anon key and url
        </Badge>
        <div className="flex gap-2">
          <Button asChild size="sm" variant="outline" disabled>
            <Link href="/sign-in">Iniciar Sesión</Link>
          </Button>
          <Button asChild size="sm" variant="default" disabled>
            <Link href="/sign-up">Registrarse</Link>
          </Button>
        </div>
      </div>
    );
  }

  return user ? (
    <div className="flex items-center gap-4">
      Hola, {user.email}
      {/* En cliente no usamos form con action */}
      <Button
        onClick={() => supabase.auth.signOut()}
        size="sm"
        variant="outline"
      >
        Cerrar Sesión
      </Button>
    </div>
  ) : (
    <div className="flex gap-2">
      <Button asChild size="sm" variant="outline">
        <Link href="/sign-in">Iniciar Sesión</Link>
      </Button>
      <Button asChild size="sm" variant="default">
        <Link href="/sign-up">Registrarse</Link>
      </Button>
    </div>
  );
}
