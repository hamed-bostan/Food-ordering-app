import Checkbox from "@mui/material/Checkbox";
import { Divider } from "@mui/material";
import { ShoppingBagOutlined, LocalShippingOutlined } from "@mui/icons-material";
import { DeliveryMethodProps } from "@/types/delivery-method.types";
import { useOrderContext } from "@/context/OrderContext";

export default function OrderDeliveryMethod({ selectedTab, setSelectedTab }: DeliveryMethodProps) {
  const { deliveryMethod, setDeliveryMethod } = useOrderContext();

  return (
    <div className="border border-[#CBCBCB] rounded-lg text-xs text-[#717171] p-4 md:text-sm md:flex justify-between mb-3 md:mb-5">
      <div className="flex items-center mb-2 gap-x-1 md:mb-0">
        <LocalShippingOutlined
          sx={{
            color: "#353535",
            fontSize: { xs: 18, md: 20 },
          }}
        />
        <span className="text-[#353535] text-sm md:text-base text-nowrap">روش تحویل سفارش</span>
      </div>
      <Divider className="md:hidden" />
      <div className="flex items-center mt-2 mb-4 gap-x-1 lg:gap-x-2 md:my-0">
        <Checkbox
          size="small"
          checked={deliveryMethod === "courier"}
          onChange={() => {
            setDeliveryMethod("courier");
            setSelectedTab("courier");
          }}
          id="term1"
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
          <span className="hidden text-xs lg:block">توسط پیک رستوران ارسال شود.</span>
        </div>
        <LocalShippingOutlined
          sx={{
            color: "#353535",
            fontSize: { xs: 18, md: 20 },
          }}
        />
      </div>
      <div className="flex items-center mb-4 gap-x-1 lg:gap-x-2 md:mb-0">
        <Checkbox
          id="term2"
          checked={deliveryMethod === "pickup"}
          onChange={() => {
            setDeliveryMethod("pickup");
            setSelectedTab("pickup");
          }}
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
          <span className="hidden text-xs lg:block text-nowrap">حضوری تحویل میگیرم.</span>
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
