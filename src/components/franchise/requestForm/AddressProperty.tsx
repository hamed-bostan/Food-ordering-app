import Input from "@/components/ui/Input";
import { getErrorMessage } from "@/utils/formHelpers";
import { useFormContext } from "react-hook-form";

export default function AddressProperty() {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="mb-12">
      <span className="block mb-6">آدرس ملک متقاضی</span>
      <div className="grid grid-cols-2 gap-4">
        <Input
          label="استان"
          {...register("province")}
          error={!!errors.province}
          helperText={getErrorMessage(errors.province)}
        />
        <Input
          label="شهر"
          {...register("city")}
          error={!!errors.city}
          helperText={getErrorMessage(errors.city)}
        />
        <Input
          label="منطقه"
          {...register("region")}
          error={!!errors.region}
          helperText={getErrorMessage(errors.region)}
        />
        <Input
          label="آدرس دقیق"
          multiline
          rows={2}
          {...register("address")}
          error={!!errors.address}
          helperText={getErrorMessage(errors.address)}
        />
      </div>
    </div>
  );
}
