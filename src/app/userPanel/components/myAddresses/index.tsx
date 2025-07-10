"use client";

import { useSelector } from "react-redux";
import EmptyStateMessage from "@/components/common/EmptyStateMessage";
import { GeolocationDialog } from "./geolocationDialog";
import AddressDialog from "./addressDialog";
import { AddressProvider } from "@/context/AddressContext";
import UserAddresses from "./userAddresses";
import { RootState } from "@/redux/store";

export default function MyAddresses() {
  const addresses = useSelector((state: RootState) => state.address.addresses); // Get address from Redux

  return (
    <AddressProvider>
      {addresses.length === 0 ? (
        <EmptyStateMessage
          text="شما در حال حاضر هیچ آدرسی ثبت نکرده‌اید!"
          button={true}
          buttonText="افزودن آدرس"
        />
      ) : (
        <UserAddresses />
      )}
      <GeolocationDialog />
      <AddressDialog />
    </AddressProvider>
  );
}
