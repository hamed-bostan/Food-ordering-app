import Checkbox from "@mui/material/Checkbox";
import { Divider } from "@mui/material";
import {
  ShoppingBagOutlined,
  LocalShippingOutlined,
} from "@mui/icons-material";
import { OrderMethodType } from ".";
import { Dispatch, SetStateAction } from "react";

type OrderDeliveryMethodProps = {
  selectedTab: OrderMethodType;
  setSelectedTab: Dispatch<SetStateAction<OrderMethodType>>;
};

export default function OrderDeliveryMethod({
  selectedTab,
  setSelectedTab,
}: OrderDeliveryMethodProps) {
  function handleTabChange(tab: OrderMethodType) {
    setSelectedTab(tab); // Set the active tab on checkbox change
  }

  return (
    <div className="border border-[#CBCBCB] rounded-lg text-xs text-[#717171] p-4 md:text-sm md:flex justify-between mb-3 md:mb-5">
      <div className="flex gap-x-1 items-center mb-2 md:mb-0">
        <LocalShippingOutlined
          sx={{
            color: "#353535",
            fontSize: { xs: 18, md: 20 },
          }}
        />
        <span className="text-[#353535] text-sm md:text-base text-nowrap">
          روش تحویل سفارش
        </span>
      </div>
      <Divider className="md:hidden" />
      <div className="flex items-center gap-x-1 lg:gap-x-2 mt-2 mb-4 md:my-0">
        <Checkbox
          size="small"
          checked={selectedTab === "courier"}
          id="term1"
          onChange={() => handleTabChange("courier")}
          sx={{
            "&.MuiCheckbox-root": {
              p: 0,
            },
            color: "#00BA88",
            "&.Mui-checked": {
              color: "#00BA88",
            },
          }}
        />
        <div className="flex flex-col gap-y-1">
          <label htmlFor="term1" className="text-nowrap">
            ارسال توسط پیک
          </label>
          <span className="hidden lg:block text-xs">
            توسط پیک رستوران ارسال شود.
          </span>
        </div>
        <LocalShippingOutlined
          sx={{
            color: "#353535",
            fontSize: { xs: 18, md: 20 },
          }}
        />
      </div>
      <div className="flex items-center gap-x-1 lg:gap-x-2 mb-4 md:mb-0">
        <Checkbox
          id="term2"
          checked={selectedTab === "pickup"}
          onChange={() => handleTabChange("pickup")}
          size="small"
          sx={{
            "&.MuiCheckbox-root": {
              p: 0,
            },
            color: "#00BA88",
            "&.Mui-checked": {
              color: "#00BA88",
            },
          }}
        />
        <div className="flex flex-col gap-y-1">
          <label htmlFor="term2" className="text-nowrap">
            تحویل حضوری
          </label>
          <span className="hidden lg:block text-xs text-nowrap">
            حضوری تحویل میگیرم.
          </span>
        </div>
        <ShoppingBagOutlined
          sx={{
            color: "#717171",
            fontSize: { xs: 18, md: 20 },
          }}
        />
      </div>
    </div>
  );
}
