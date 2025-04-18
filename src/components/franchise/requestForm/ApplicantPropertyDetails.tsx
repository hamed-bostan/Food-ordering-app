import Input from "@/components/ui/Input";

export default function ApplicantPropertyDetails() {
  return (
    <div className="mb-12">
      <span className="mb-6 block">مشخصات ملک متقاضی</span>
      <div className="flex gap-x-4">
        <Input label="نوع مالکیت" />
        <Input label="مساحت ملک (متر مربع)" />
        <Input label="سن بنا" />
      </div>
    </div>
  );
}
