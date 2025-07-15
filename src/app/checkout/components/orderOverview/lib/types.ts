import { Dispatch, SetStateAction } from "react";

export type OrderMethodType = "courier" | "pickup";

export type OrderDeliveryMethodProps = {
  selectedTab: OrderMethodType;
  setSelectedTab: Dispatch<SetStateAction<OrderMethodType>>;
};