import CustomButton from "@/presentation/components/CustomButton";
import ApplicantFeatures from "./ApplicantFeatures";

export default function FacilityProperty() {
  return (
    <div>
      <span className="mb-6 block text-[#353535]">امکانات ملک متقاضی</span>
      <div className="grid grid-cols-2 mb-4">
        <ApplicantFeatures />
      </div>
      <CustomButton type="submit" sx={{ mx: "auto", display: "flex", width: "8rem" }}>
        ثبت اطلاعات
      </CustomButton>
    </div>
  );
}
