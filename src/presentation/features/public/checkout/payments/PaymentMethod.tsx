import Checkbox from "@mui/material/Checkbox";
import { Divider } from "@mui/material";
import { WalletOutlined, AddCardOutlined } from "@mui/icons-material";
import { PaymentMethodProps } from "@/types/payment-method.types";
import { useOrderContext } from "@/context/OrderContext";

export default function PaymentMethod({ selectedTab, setSelectedTab }: PaymentMethodProps) {
  const { paymentMethod, setPaymentMethod } = useOrderContext();

  return (
    <div className="border border-[#CBCBCB] rounded-lg text-xs text-[#717171] p-4 md:text-sm md:flex justify-between mb-3 md:mb-5">
      <div className="flex items-center mb-2 gap-x-1 md:mb-0">
        <WalletOutlined sx={{ color: "#353535", fontSize: { xs: 18, md: 20 } }} />
        <span className="text-[#353535] text-sm md:text-base">روش پرداخت</span>
      </div>
      <Divider className="md:hidden" />

      <div className="flex items-center mt-2 mb-4 gap-x-1 lg:gap-x-2 md:my-0">
        <Checkbox
          id="term1"
          checked={paymentMethod === "online"}
          onChange={() => {
            setPaymentMethod("online");
            setSelectedTab("online");
          }}
          disableRipple
          size="small"
          sx={{
            "&.MuiCheckbox-root": { p: 0 },
            color: "#00BA88",
            "&.Mui-checked": { color: "#00BA88" },
          }}
        />
        <div className="flex flex-col gap-y-1">
          <label htmlFor="term1" className="text-nowrap">
            پرداخت اینترنتی
          </label>
          <span className="hidden text-xs lg:block text-nowrap">آنلاین پرداخت میکنم.</span>
        </div>
        <AddCardOutlined sx={{ color: "#717171", fontSize: { xs: 18, md: 20 } }} />
      </div>

      <div className="flex items-center gap-x-1 lg:gap-x-2">
        <Checkbox
          id="term2"
          checked={paymentMethod === "cash"}
          onChange={() => {
            setPaymentMethod("cash");
            setSelectedTab("cash");
          }}
          disableRipple
          size="small"
          sx={{
            "&.MuiCheckbox-root": { p: 0 },
            color: "#00BA88",
            "&.Mui-checked": { color: "#00BA88" },
          }}
        />
        <div className="flex flex-col gap-y-1">
          <label htmlFor="term2" className="text-nowrap">
            پرداخت در محل
          </label>
          <span className="hidden text-xs lg:block text-nowrap">در محل پرداخت میکنم.</span>
        </div>
        <WalletOutlined sx={{ color: "#717171", fontSize: { xs: 18, md: 20 } }} />
      </div>
    </div>
  );
}
