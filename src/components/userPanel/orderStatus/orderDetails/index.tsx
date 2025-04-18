import {
  CalendarMonthOutlined,
  ScheduleOutlined,
  LocationOnOutlined,
  CreditCardOutlined,
} from "@mui/icons-material";

export default function OrderDetails() {
  return (
    <div className="mb-4">
      <div className="text-xs flex items-center mb-4">
        <span className="text-sm text-[#757575] lg:text-base">شعبه اقدسیه</span>
        <span className="flex items-center mr-auto px-2 h-6 text-[#353535] bg-[#EDEDED] rounded-sm md:h-7">
          تحویل حضوری
        </span>
        <span className="mr-2 flex items-center justify-center min-w-12 h-6 bg-[#FFF8E1] text-[#A9791C] rounded-sm md:h-7">
          جاری
        </span>
      </div>
      <div className="text-xs text-[#757575] grid grid-cols-2 grid-rows-3 gap-y-2">
        <div className="flex items-center">
          <CalendarMonthOutlined
            sx={{ color: "#717171", fontSize: { xs: 16, md: 18 } }}
            className="ml-1"
          />
          <p>شنبه، ۸ مرداد، ساعت ۱۸:۵۳</p>
        </div>
        <div className="flex items-center mr-auto">
          <ScheduleOutlined
            sx={{ color: "#717171", fontSize: { xs: 16, md: 18 } }}
            className="ml-1"
          />
          <span>آماده تحویل تا</span>
          <span className="text-[#417F56]">۲۵:۳۳</span>
        </div>
        <div className="flex items-center col-span-full">
          <LocationOnOutlined
            sx={{ color: "#717171", fontSize: { xs: 16, md: 18 } }}
            className="ml-1"
          />
          <p>تهران: اقدسیه، بزرگراه ارتش، مجتمع شمیران سنتر، طبقه ۱۰</p>
        </div>
        <div className="flex items-center col-span-full">
          <CreditCardOutlined
            sx={{ color: "#717171", fontSize: { xs: 16, md: 18 } }}
            className="ml-1"
          />
          <span>مبلغ: ۲۸٬۵۰۰ تومان</span>
          <span>تخفیف: ۲۸٬۵۰۰ تومان</span>
        </div>
      </div>
    </div>
  );
}
