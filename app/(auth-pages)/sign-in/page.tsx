"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "../../../utils/supabase/client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SubmitButton } from "@/components/submit-button";
import { FormMessage } from "@/components/form-message";
import Link from "next/link";

type Message = {
  content: string;
  type?: "error" | "success"; // Add the 'type' property with possible values
};

export default function Login() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const supabase = createClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setMessage(error.message);
    } else {
      router.push("/dashboard");
    }

    setLoading(false);
  };

  useEffect(() => {
    const msg = searchParams.get("message");
    if (msg) setMessage(msg);
  }, [searchParams]);

  return (
    <form onSubmit={handleSubmit} className="flex-1 flex flex-col min-w-64">
      <h1 className="text-2xl font-medium">Iniciar Sesión</h1>
      <p className="text-sm text-foreground">
        No tienes una cuenta?{" "}
        <Link className="text-foreground font-medium underline" href="/sign-up">
          Registrarse
        </Link>
      </p>

      <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
        <Label htmlFor="email">Email</Label>
        <Input
          name="email"
          placeholder="you@example.com"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <div className="flex justify-between items-center">
          <Label htmlFor="password">Password</Label>
          <Link
            className="text-xs text-foreground underline"
            href="/forgot-password"
          >
            Forgot Password?
          </Link>
        </div>
        <Input
          type="password"
          name="password"
          placeholder="Your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <SubmitButton pendingText="Signing In...">Sign in</SubmitButton>

        {message && (
          <FormMessage message={{ type: "error", content: message }} />
        )}
      </div>
    </form>
  );
}
