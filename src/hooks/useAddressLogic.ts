"use client";

import { AddressType } from "@/application/schemas/address.schema";
import { useOrderContext } from "@/context/OrderContext";
import { isOrderDeliveryValid } from "@/domain/order/order.rules";
import { useEffect } from "react";

export function useAddressLogic(addresses: AddressType[], isLoading: boolean) {
  const { deliveryMethod, selectedAddress, setSelectedAddress } = useOrderContext();

  // Effect 1: Validate and reset current address if invalid
  useEffect(() => {
    if (isLoading) return;

    if (!isOrderDeliveryValid(deliveryMethod, null, selectedAddress)) {
      setSelectedAddress(null);
    }
  }, [deliveryMethod, selectedAddress, isLoading]);

  // Effect 2: Auto-select latest valid address when addresses or related props change
  useEffect(() => {
    if (isLoading) return;

    if (deliveryMethod === "courier") {
      if (addresses.length === 0) {
        if (selectedAddress !== null) {
          setSelectedAddress(null);
        }
      } else {
        const latest = addresses[addresses.length - 1];
        if (
          (!selectedAddress || selectedAddress.id !== latest.id) &&
          isOrderDeliveryValid(deliveryMethod, null, latest)
        ) {
          setSelectedAddress(latest);
        }
      }
    }
  }, [addresses, isLoading, deliveryMethod]);
}
