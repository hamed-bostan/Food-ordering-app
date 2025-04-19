import axios from "axios";

const supabaseUrl: string = process.env.SUPABASE_URL as string;
// const supabaseKey: string = process.env.SUPABASE_KEY as string;

export const axiosInstance = axios.create({
  baseURL: `${supabaseUrl}/rest/v1`,
  headers: { "Content-Type": "application/json" },
});
