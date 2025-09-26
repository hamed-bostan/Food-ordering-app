import CustomButton from "@/presentation/components/CustomButton";
import Input from "@/presentation/components/Input";
import { Divider } from "@mui/material";
import PercentOutlinedIcon from "@mui/icons-material/PercentOutlined";

export default function DiscountCode() {
  return (
    <div className="p-4 border border-[#CBCBCB] rounded-lg mb-3 md:mb-5">
      <div className="mb-2 flex gap-x-1 items-center">
        <PercentOutlinedIcon sx={{ color: "#353535", fontSize: { xs: 18, md: 20 } }} />
        <span className="text-sm text-[#353535]">ثبت کد تخفیف</span>
      </div>
      <Divider />
      <div className="flex gap-x-4 mt-4">
        <Input label="کد تخفیف" />
        <CustomButton size="small" sx={{ width: "100px", backgroundColor: "#CBCBCB" }}>
          ثبت کد
        </CustomButton>
      </div>
    </div>
  );
}
