"use client";

import { useState, useEffect } from "react";
import type { AddressType } from "@/application/schemas/address.schema";
import { useSession } from "next-auth/react";
import { AddressService } from "@/application/services/address.service";
import { toast } from "react-toastify";

export function useUserAddresses() {
  const { data: session, status } = useSession();
  const [addresses, setAddresses] = useState<AddressType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchAddresses = async () => {
    if (!session?.accessToken || !session?.user?.id) {
      setIsLoading(false);
      return;
    }

    try {
      const userAddresses = await AddressService.fetchAll(session.user.id, session.accessToken!);
      setAddresses(userAddresses || []);
    } catch (err) {
      console.error("❌ Failed to load user addresses:", err);
      toast.error("خطا در بارگذاری آدرس‌ها");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (status === "authenticated") fetchAddresses();
  }, [status, session]);

  return { addresses, isLoading, setAddresses, fetchAddresses };
}
