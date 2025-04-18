import Checkbox from "@mui/material/Checkbox";
import CustomButton from "@/components/ui/CustomButton";
import Image from "next/image";

export default function FacilityProperty() {
  return (
    <div>
      <span className="mb-6 block text-[#353535]">امکانات ملک متقاضی</span>
      <div className="grid grid-cols-2 mb-4">
        <ApplicantFeatures />
        <PropertyImages />
      </div>
      <CustomButton sx={{ mx: "auto", display: "flex", width: "8rem" }}>
        ثبت اطلاعات
      </CustomButton>
    </div>
  );
}

function ApplicantFeatures() {
  return (
    <div>
      <span className="text-[#717171] block mb-4">ملک متقاضی:</span>
      <div className="grid grid-cols-2">
        <div className="flex items-center">
          <Checkbox
            id="terms-1"
            size="small"
            sx={{
              color: "#00BA88",
              "&.Mui-checked": {
                color: "#00BA88",
              },
            }}
          />
          <label htmlFor="terms-1" className="text-[#717171]">
            پروانه کسب دارد.
          </label>
        </div>
        <div className="flex items-center">
          <Checkbox
            id="terms-2"
            size="small"
            sx={{
              color: "#00BA88",
              "&.Mui-checked": {
                color: "#00BA88",
              },
            }}
          />
          <label htmlFor="terms-2" className="text-[#717171]">
            پارکینگ دارد.
          </label>
        </div>
        <div className="flex items-center">
          <Checkbox
            id="terms-3"
            size="small"
            sx={{
              color: "#00BA88",
              "&.Mui-checked": {
                color: "#00BA88",
              },
            }}
          />
          <label htmlFor="terms-3" className="text-[#717171]">
            آشپزخانه دارد.
          </label>
        </div>
        <div className="flex items-center">
          <Checkbox
            id="terms-4"
            size="small"
            sx={{
              color: "#00BA88",
              "&.Mui-checked": {
                color: "#00BA88",
              },
            }}
          />
          <label htmlFor="terms-4" className="text-[#717171]">
            انبار دارد.
          </label>
        </div>
      </div>
    </div>
  );
}

function PropertyImages() {
  return (
    <div className="w-full">
      <span className="text-[#717171] mb-1 block">تصاویر ملک</span>
      <div className="flex flex-col gap-y-2 border-2 border-[#CBCBCB] rounded-sm items-center w-full min-h-32 justify-center">
        <Image
          src="/assets/images/icons/upload-image.svg"
          alt="upload image icon"
          width={50}
          height={50}
          className="w-10 h-10 cursor-pointer"
        />
        <span className="text-[#717171] cursor-pointer">
          تصاویری از ملک را بارگذاری کنید ...
        </span>
      </div>
    </div>
  );
}
