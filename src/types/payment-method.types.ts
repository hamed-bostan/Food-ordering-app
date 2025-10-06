import { PaymentMethodType } from "@/application/schemas/order.schema";
import { Dispatch, SetStateAction } from "react";

export type PaymentMethodProps = {
  selectedTab: PaymentMethodType;
  setSelectedTab: Dispatch<SetStateAction<PaymentMethodType>>;
};
