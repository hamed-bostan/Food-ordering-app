"use client";

import { useState, useEffect } from "react";
import type { AddressType } from "@/application/schemas/address.schema";
import { useSession } from "next-auth/react";
import { AddressService } from "@/application/services/address.service";
import { toast } from "react-toastify";

export function useUserAddresses(initialAddresses: AddressType[] = []) {
  const { data: session, status } = useSession();

  const hasInitial = initialAddresses.length > 0;

  const [addresses, setAddresses] = useState<AddressType[]>(initialAddresses);

  // 🚀 If we have initial addresses, we are NOT loading
  const [isLoading, setIsLoading] = useState(!hasInitial);

  const fetchAddresses = async () => {
    if (!session?.accessToken || !session.user?.id) {
      setIsLoading(false);
      return;
    }

    try {
      const userAddresses = await AddressService.fetchAll(
        session.user.id,
        session.accessToken!
      );
      setAddresses(userAddresses || []);
    } catch (err) {
      toast.error("خطا در بارگذاری آدرس‌ها");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (status === "authenticated" && !hasInitial) {
      fetchAddresses();
    }
  }, [status, session]);

  return { addresses, isLoading, setAddresses, fetchAddresses };
}
