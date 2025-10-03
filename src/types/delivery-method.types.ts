import { DeliveryMethodType } from "@/application/schemas/order.schema";
import { Dispatch, SetStateAction } from "react";

export type DeliveryMethodProps = {
  selectedTab: DeliveryMethodType;
  setSelectedTab: Dispatch<SetStateAction<DeliveryMethodType>>;
};
