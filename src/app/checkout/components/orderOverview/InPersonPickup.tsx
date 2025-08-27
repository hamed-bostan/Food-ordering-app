import { Divider } from "@mui/material";
import { LocationOnOutlined } from "@mui/icons-material";

export default function InPersonPickup() {
  return (
    <div className="border border-[#CBCBCB] rounded-lg p-4">
      <div className="flex gap-x-1 items-center mb-2 md:mb-4">
        <LocationOnOutlined
          sx={{
            color: "#353535",
            fontSize: { xs: 18, md: 20 },
          }}
        />
        <span className="text-[#353535] text-sm">آدرس شعبه اکباتان</span>
      </div>
      <Divider className="md:hidden" />
      <div className="flex flex-col gap-y-1 px-2 pt-3 text-[#717171] text-xs md:gap-y-2 md:mb-5">
        <p>شهرک اکباتان، فاز ۳، مجتمع تجاری کوروش، طبقه سوم</p>
        <p>شماره تماس ۱: ۱۲۵۴ ۵۴۸۹ -۰۲۱</p>
        <p>شماره تماس ۲: ۱۲۵۵ ۵۴۸۹ -۰۲۱ </p>
        <p>ساعت کاری: همه‌روزه از ساعت ۱۲ تا ۲۳ بجز روزهای تعطیل</p>
      </div>
    </div>
  );
}
