import { useFormContext, Controller } from "react-hook-form";
import Checkbox from "@mui/material/Checkbox";
import CustomButton from "@/components/ui/CustomButton";
import Image from "next/image";
import uploadIcon from "@/assets/images/icons/upload-image.svg";
import { FormControlLabel } from "@mui/material";

export default function FacilityProperty() {
  return (
    <div>
      <span className="mb-6 block text-[#353535]">امکانات ملک متقاضی</span>
      <div className="grid grid-cols-2 mb-4">
        <ApplicantFeatures />
        <PropertyImages />
      </div>
      <CustomButton
        type="submit"
        sx={{ mx: "auto", display: "flex", width: "8rem" }}
      >
        ثبت اطلاعات
      </CustomButton>
    </div>
  );
}

function ApplicantFeatures() {
  const { control } = useFormContext();

  return (
    <div>
      <p className="text-[#717171] block mb-4">ملک متقاضی:</p>
      <div className="grid grid-cols-2 gap-y-2">
        <Controller
          name="hasBusinessLicense"
          control={control}
          render={({ field }) => (
            <FormControlLabel
              control={
                <Checkbox
                  {...field}
                  checked={!!field.value}
                  size="small"
                  sx={{
                    color: "#00BA88",
                    "&.Mui-checked": {
                      color: "#00BA88",
                    },
                  }}
                />
              }
              label="پروانه کسب دارد."
              sx={{ color: "#717171" }}
            />
          )}
        />
        <Controller
          name="hasParking"
          control={control}
          render={({ field }) => (
            <FormControlLabel
              control={
                <Checkbox
                  {...field}
                  checked={!!field.value}
                  size="small"
                  sx={{
                    color: "#00BA88",
                    "&.Mui-checked": {
                      color: "#00BA88",
                    },
                  }}
                />
              }
              label="پارکینگ دارد."
              sx={{ color: "#717171" }}
            />
          )}
        />
        <Controller
          name="hasKitchen"
          control={control}
          render={({ field }) => (
            <FormControlLabel
              control={
                <Checkbox
                  {...field}
                  checked={!!field.value}
                  size="small"
                  sx={{
                    color: "#00BA88",
                    "&.Mui-checked": {
                      color: "#00BA88",
                    },
                  }}
                />
              }
              label="آشپزخانه دارد."
              sx={{ color: "#717171" }}
            />
          )}
        />
        <Controller
          name="hasStorage"
          control={control}
          render={({ field }) => (
            <FormControlLabel
              control={
                <Checkbox
                  {...field}
                  checked={!!field.value}
                  size="small"
                  sx={{
                    color: "#00BA88",
                    "&.Mui-checked": {
                      color: "#00BA88",
                    },
                  }}
                />
              }
              label="انبار دارد."
              sx={{ color: "#717171" }}
            />
          )}
        />
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
          src={uploadIcon}
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
