"use client";

import AdditionalOrderInfo from "./AdditionalOrderInfo";
import Address from "@/presentation/features/address";
import DeliveryMethod from "./DeliveryMethod";
import PickupDelivery from "./PickupDelivery";
import { useOrderContext } from "@/context/OrderContext";
import { useEffect } from "react";
import { AddressType } from "@/application/schemas/address.schema";

export default function OrderOverview({
  addresses,
  initialSelectedAddress,
}: {
  addresses: AddressType[];
  initialSelectedAddress: AddressType | null;
}) {
  const { deliveryMethod, setSelectedAddress, selectedAddress } = useOrderContext();
  // Optionally set initial selected if not already in provider
  useEffect(() => {
    if (initialSelectedAddress && !selectedAddress) {
      setSelectedAddress(initialSelectedAddress);
    }
  }, []); // Once on mount
  
  return (
    <div>
      <DeliveryMethod />
      {deliveryMethod === "courier" && <Address initialAddresses={addresses} />}
      {deliveryMethod === "pickup" && <PickupDelivery />}
      <AdditionalOrderInfo />
    </div>
  );
}
