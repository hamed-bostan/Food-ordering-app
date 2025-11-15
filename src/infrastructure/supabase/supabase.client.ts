import { createClient } from "@supabase/supabase-js";

// Only throw helpful error in local development
if (process.env.NODE_ENV !== "production") {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    throw new Error(
      "Missing Supabase env variables. Add NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY to your .env.local"
    );
  }
}

// In build time / GitHub Actions → use dummy values so createClient doesn't throw
// In real production (Docker on VPS) → real values are injected → works normally
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://dummy.supabase.co";
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "dummy-service-key";

export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);
