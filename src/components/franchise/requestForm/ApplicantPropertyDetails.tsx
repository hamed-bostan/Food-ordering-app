import Input from "@/components/ui/Input";
import { getErrorMessage } from "@/utils/formHelpers";
import { useFormContext } from "react-hook-form";

export default function ApplicantPropertyDetails() {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <div className="mb-12">
      <span className="block mb-6">مشخصات ملک متقاضی</span>
      <div className="flex gap-x-4">
        <Input
          label="نوع مالکیت"
          {...register("ownershipType")}
          error={!!errors.ownershipType}
          helperText={getErrorMessage(errors.ownershipType)}
        />
        <Input
          label="مساحت ملک (متر مربع)"
          {...register("propertyArea")}
          error={!!errors.propertyArea}
          helperText={getErrorMessage(errors.propertyArea)}
        />
        <Input
          label="سن بنا"
          {...register("buildingAge")}
          error={!!errors.buildingAge}
          helperText={getErrorMessage(errors.buildingAge)}
        />
      </div>
    </div>
  );
}
