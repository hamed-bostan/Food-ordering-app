"use client";

import { useMounted } from "@/hooks/useMounted";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ToastProvider() {
  const mounted = useMounted();

  if (!mounted) return null;

  return <ToastContainer rtl position="top-center" />;
}
