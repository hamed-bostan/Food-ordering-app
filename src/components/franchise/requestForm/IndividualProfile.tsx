import Input from "../../ui/Input";

export default function IndividualProfile() {
  return (
    <div className="mb-10">
      <span className="mb-6 block">مشخصات فردی متقاضی</span>
      <div className="flex gap-x-4">
        <Input label="نام و نام خانوادگی" />
        <Input label="کدملی" />
        <Input label="شماره تماس" />
      </div>
    </div>
  );
}
