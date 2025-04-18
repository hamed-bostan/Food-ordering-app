import CustomButton from "../ui/CustomButton";
import Input from "../ui/Input";

export default function Consultation() {
  return (
    <div className="py-9">
      <span className="text-center block mb-6">دریافت مشاوره</span>
      <div className="flex gap-x-6 mb-6">
        <Input label="نام و نام‌خانوادگی" />
        <Input label="شماره تماس" />
        <Input label="زمان ایده‌آل" />
      </div>
      <CustomButton sx={{ mx: "auto", display: "flex" }}>
        درخواست مشاوره
      </CustomButton>
    </div>
  );
}
