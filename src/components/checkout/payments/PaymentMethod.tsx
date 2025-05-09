import Checkbox from "@mui/material/Checkbox";
import { Divider } from "@mui/material";
import { WalletOutlined, AddCardOutlined } from "@mui/icons-material";
import { Dispatch, SetStateAction } from "react";
import { PaymentMethodType } from ".";

type PaymentMethodProps = {
  selectedTab: PaymentMethodType;
  setSelectedTab: Dispatch<SetStateAction<PaymentMethodType>>;
};

export default function PaymentMethod({
  selectedTab,
  setSelectedTab,
}: PaymentMethodProps) {
  function handleTabChange(tab: PaymentMethodType) {
    setSelectedTab(tab); // Set the active tab on checkbox change
  }

  return (
    <div className="border border-[#CBCBCB] rounded-lg text-xs text-[#717171] p-4 md:text-sm md:flex justify-between mb-3 md:mb-5">
      <div className="flex gap-x-1 items-center mb-2 md:mb-0">
        <WalletOutlined
          sx={{ color: "#353535", fontSize: { xs: 18, md: 20 } }}
        />
        <span className="text-[#353535] text-sm md:text-base">روش پرداخت</span>
      </div>
      <Divider className="md:hidden" />
      <div className="flex items-center gap-x-1 lg:gap-x-2 mt-2 mb-4 md:my-0">
        <Checkbox
          id="term1"
          checked={selectedTab === "OnlinePayment"}
          onChange={() => handleTabChange("OnlinePayment")}
          disableRipple
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
          <label htmlFor="term1" className="text-nowrap">
            پرداخت اینترنتی
          </label>
          <span className="hidden lg:block text-xs text-nowrap">
            آنلاین پرداخت میکنم.
          </span>
        </div>
        <AddCardOutlined
          sx={{ color: "#717171", fontSize: { xs: 18, md: 20 } }}
        />
      </div>
      <div className="flex items-center gap-x-1 lg:gap-x-2">
        <Checkbox
          id="term2"
          checked={selectedTab === "PayOnDelivery"}
          onChange={() => handleTabChange("PayOnDelivery")}
          disableRipple
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
            پرداخت در محل
          </label>
          <span className="hidden lg:block text-xs text-nowrap">
            در محل پرداخت میکنم.
          </span>
        </div>
        <WalletOutlined
          sx={{ color: "#717171", fontSize: { xs: 18, md: 20 } }}
        />
      </div>
    </div>
  );
}
