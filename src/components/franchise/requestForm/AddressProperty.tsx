import Input from "@/components/ui/Input";

export default function AddressProperty() {
  return (
    <div className="mb-12">
      <span className="mb-6 block">آدرس ملک متقاضی</span>
      <div className="grid grid-cols-2 gap-4">
        <Input label="استان" />
        <Input label="شهر" />
        <Input label="منطقه" />
        <Input label="آدرس دقیق" multiline rows={2} />
      </div>
    </div>
  );
}
