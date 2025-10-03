import { useSelector, useDispatch } from "react-redux";
import formatToPersianStyle from "@/lib/utils/formatToPersianStyle";
import ItemsOverviewMobile from "./shared/cartItemsMobileView";
import { Divider, IconButton } from "@mui/material";
import { ReportGmailerrorredOutlined, DeleteOutlined } from "@mui/icons-material";
import { RootState } from "@/store";
import { clear } from "@/store/cart.slice";
import CustomButton from "@/presentation/components/CustomButton";
import { useCheckoutTab } from "@/context/checkout-tab.context";
import { createOrder } from "@/infrastructure/apis/order.api";
import { useOrderContext } from "@/context/OrderContext";
import { CreateOrderDtoType } from "@/application/schemas/order.schema";

export default function CartSummary() {
  const { deliveryMethod, branch, address, paymentMethod, notes } = useOrderContext();
  const selectedItems = useSelector((state: RootState) => state.cart.selectedItems);

  const dispatch = useDispatch();
  const { activeTab } = useCheckoutTab();
  const hasBorder = activeTab === 1 || activeTab === 2;
  const hasQuantitySelector = activeTab === 1 || activeTab === 2;

  // Fetch the itemsCounter from the Redux store
  const itemsCounter = useSelector((state: RootState) => state.cart.itemsCounter);

  // Calculate total discount
  const totalDiscount = parseFloat(
    selectedItems
      .reduce((total, item) => {
        const itemDiscount = ((item.price * (item.discount ?? 0)) / 100) * item.quantity;
        return total + itemDiscount;
      }, 0)
      .toFixed(2) // Round to 2 decimal places
  );

  // Calculate total payable amount
  const totalPayable = parseFloat(
    selectedItems
      .reduce((total, item) => {
        const discountedPrice = item.price - (item.price * (item.discount ?? 0)) / 100;
        return total + discountedPrice * item.quantity;
      }, 0)
      .toFixed(2)
  );

  // Handler to clear the cart
  const handleClearCart = () => {
    dispatch(clear());
  };

  const handleSubmitOrder = async () => {
    console.log("branch:", branch);
    console.log("deliveryMethod:", deliveryMethod);
    console.log("paymentMethod:", paymentMethod);
    console.log("selectedItems:", selectedItems);
    console.log("address:", address);

    // Validate according to your schema rules
    if (
      !deliveryMethod ||
      !paymentMethod ||
      (deliveryMethod === "pickup" && branch === null) ||
      (deliveryMethod === "courier" && branch !== null)
    ) {
      console.warn("Please select valid branch, delivery method, and payment method.");
      return;
    }

    if (!selectedItems.length) {
      console.warn("No items selected in cart.");
      return;
    }

    // Prepare order payload
    const orderPayload: CreateOrderDtoType = {
      branch,
      deliveryMethod,
      paymentMethod,
      address: address ?? null,
      notes: notes || null,
      items: selectedItems.map((item) => ({
        productId: item.id,
        name: item.title,
        quantity: item.quantity,
        price: item.price,
        discount: item.discount != null ? Number(item.discount) : 0,
      })),
      totalPrice: selectedItems.reduce((total, item) => {
        const discountedPrice = item.price - (item.price * (item.discount != null ? Number(item.discount) : 0)) / 100;
        return total + discountedPrice * item.quantity;
      }, 0),
    };

    console.log("Payload:", orderPayload);

    try {
      const response = await createOrder(orderPayload);
      console.log("✅ Order created:", response);
    } catch (err) {
      console.error("❌ Failed to submit order:", err);
    }
  };

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
      <CustomButton type="submit" onClick={handleSubmitOrder} size="medium" sx={{ width: "100%" }}>
        ثبت سفارش
      </CustomButton>
    </div>
  );
}
