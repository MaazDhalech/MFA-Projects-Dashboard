"use client";

import { useEffect } from "react";

const REQUIRED_KEYS = [
  "NEXT_PUBLIC_SUPABASE_URL",
  "NEXT_PUBLIC_SUPABASE_ANON_KEY",
] as const;

export function EnvWarning() {
  useEffect(() => {
    const missing = REQUIRED_KEYS.filter((key) => !process.env[key]);
    if (missing.length > 0) {
      console.warn(
        `Missing Supabase environment variables: ${missing.join(
          ", "
        )}. The dashboard cannot load live data until they are defined.`
      );
    }
  }, []);

  return null;
}
