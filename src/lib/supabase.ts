import { createClient } from "@supabase/supabase-js";

// Access environment variables
const supabaseUrl: string = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseKey: string = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;

// Initialize Supabase client
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
