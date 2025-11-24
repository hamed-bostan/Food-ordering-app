import { useSelector, useDispatch } from "react-redux";
import formatToPersianStyle from "@/lib/utils/formatToPersianStyle";
import ItemsOverviewMobile from "./shared/cartItemsMobileView";
import { Divider, IconButton } from "@mui/material";
import { ReportGmailerrorredOutlined, DeleteOutlined } from "@mui/icons-material";
import { RootState } from "@/store";
import { clear } from "@/store/cart.slice";
import CustomButton from "@/presentation/components/CustomButton";
import { useCheckoutTab } from "@/context/checkout-tab.context";
import { useOrderContext } from "@/context/OrderContext";
import { useUserAddresses } from "@/hooks/useUserAddresses";
import { useOrderSubmit } from "@/hooks/useOrderSubmit";
import { useAddressLogic } from "@/hooks/useAddressLogic";
import { calculateOrderTotal, calculateTotalDiscount } from "@/domain/order/order.rules";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function CartSummary() {
  const dispatch = useDispatch();
  const { activeTab } = useCheckoutTab();
  const selectedItems = useSelector((state: RootState) => state.cart.selectedItems);
  const itemsCounter = useSelector((state: RootState) => state.cart.itemsCounter);
  const { deliveryMethod, branch, paymentMethod, address, notes } = useOrderContext();
  const { addresses, isLoading } = useUserAddresses();

  const { submitOrder } = useOrderSubmit();

  const { data: session } = useSession();
  const router = useRouter();

  // Automatically handle address selection and validation
  useAddressLogic(addresses, isLoading);

  const hasBorder = activeTab === 1 || activeTab === 2;
  const hasQuantitySelector = activeTab === 1 || activeTab === 2;

  const totalDiscount = calculateTotalDiscount(selectedItems);
  const totalPayable = calculateOrderTotal(selectedItems);

  const handleSubmitOrder = async () => {
    const result = await submitOrder({
      deliveryMethod,
      paymentMethod,
      address,
      branch,
      notes,
      selectedItems,
      addresses,
    });

    if (result) {
      try {
        await axios.post("/api/send-order-to-n8n", {
          customerPhone: "09356776075",
          orderId: result.orderId || Date.now(),
          totalPrice: calculateOrderTotal(selectedItems),
          orderSummary: selectedItems.map((i) => `${i.quantity}x ${i.title}`).join(", "),
        });
      } catch (error) {
        console.error("❌ Error sending data to n8n:", error);
      }

      dispatch(clear());
    }
  };

  const handleClearCart = () => {
    dispatch(clear());
  };

  const buttonText = session ? "ثبت نام" : "ثبت سفارش";
  const handleButtonClick = session ? handleSubmitOrder : () => router.push("/auth");

  return (
    <div
      className={`text-sm text-[#353535] md:border md:border-[#CBCBCB] md:p-4 lg:p-5 md:rounded-lg md:h-fit ${
        hasBorder && "border border-[#CBCBCB] rounded-lg p-4"
      }`}
    >
      <div className="justify-between hidden mb-3 md:flex">
        <span className="text-base">سبد خرید ({itemsCounter})</span>
        <IconButton onClick={handleClearCart} aria-label="حذف سبد خرید" size="small">
          <DeleteOutlined
            sx={{
              color: "#353535",
            }}
          />
        </IconButton>
      </div>
      <Divider className="hidden md:block md:mb-3" />
      {hasQuantitySelector && (
        <div className="hidden md:block">
          <ItemsOverviewMobile selectedItems={selectedItems} />
        </div>
      )}
      <div className="flex justify-between py-3">
        <span>تخفیف محصولات</span>
        <span className="text-[#717171]">{formatToPersianStyle(totalDiscount)} تومان</span>
      </div>
      <Divider />
      <div className="flex justify-between mt-3 mb-2">
        <span>هزینه ارسال</span>
        <span className="text-[#717171]">0 تومان</span>
      </div>
      <div className="flex mb-3 gap-x-2">
        <div>
          <ReportGmailerrorredOutlined fontSize="small" sx={{ color: "#A9791C" }} />
        </div>
        <p className="text-xs text-[#A9791C]">
          هزینه ارسال در ادامه بر اساس آدرس، زمان و نحوه ارسال انتخابی شما محاسبه و به این مبلغ اضافه خواهد شد.
        </p>
      </div>
      <Divider />
      <div className="flex justify-between py-3">
        <span>مبلغ قابل پرداخت</span>
        <span className="text-[#417F56]">{formatToPersianStyle(totalPayable)} تومان</span>
      </div>
      <CustomButton type="submit" onClick={handleButtonClick} size="medium" sx={{ width: "100%" }}>
        {buttonText}
      </CustomButton>
    </div>
  );
}
