import { Dispatch, SetStateAction } from "react";

export type PaymentMethodType = "OnlinePayment" | "PayOnDelivery";

export type PaymentMethodProps = {
  selectedTab: PaymentMethodType;
  setSelectedTab: Dispatch<SetStateAction<PaymentMethodType>>;
};
