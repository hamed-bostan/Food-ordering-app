"use client";

import { AddressType } from "@/application/schemas/address.schema";
import { useOrderContext } from "@/context/OrderContext";
import { isOrderDeliveryValid } from "@/domain/order/order.rules";
import { useEffect } from "react";

export function useAddressLogic(addresses: AddressType[], isLoading: boolean) {
  const { deliveryMethod, address, setAddress } = useOrderContext();

  useEffect(() => {
    if (isLoading) return;

    if (!isOrderDeliveryValid(deliveryMethod, null, address)) {
      setAddress(null);
      return;
    }

    if (deliveryMethod === "courier") {
      if (addresses.length === 0) {
        if (address !== null) {
          setAddress(null);
        }
      } else {
        const latest = addresses[addresses.length - 1];
        if (!address || address.id !== latest.id) setAddress(latest);
      }
    }
  }, [addresses, isLoading, deliveryMethod]);
}
