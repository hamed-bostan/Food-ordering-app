import axios from "axios";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const axiosInstance = axios.create({
  baseURL: `${supabaseUrl}/rest/v1`,
  headers: {
    apikey: supabaseKey!,
    Authorization: `Bearer ${supabaseKey!}`,
    "Content-Type": "application/json",
  },
});

console.log(axiosInstance.defaults.baseURL);

