import { Dispatch, SetStateAction } from "react";

export type PaymentMethodType = "online" | "cash";

export type PaymentMethodProps = {
  selectedTab: PaymentMethodType;
  setSelectedTab: Dispatch<SetStateAction<PaymentMethodType>>;
};
