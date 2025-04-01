import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export const createClient = () => {
  const cookieStore = cookies(); // SIN await

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name) {
          return cookieStore.get(name)?.value;
        },
        getAll() {
          return Array.from(cookieStore.getAll()).map(({ name, value }) => ({
            name,
            value,
          }));
        },
        set() {
          // Ignorado por Server Components (lo maneja Supabase desde middleware)
        },
        delete() {},
      },
    }
  );
};
