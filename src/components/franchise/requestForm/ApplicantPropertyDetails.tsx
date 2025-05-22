import Input from "@/components/ui/Input";
import { getErrorMessage } from "@/utils/formHelpers";
import {
  FormControl,
  InputLabel,
  Select,
  SelectChangeEvent,
  MenuItem,
  FormHelperText,
} from "@mui/material";
import { useFormContext } from "react-hook-form";

const ownershipOptions = ["شخصی", "اجاره‌ای", "رهن کامل"];

export default function ApplicantPropertyDetails() {
  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext();

  function handleOnChange(event: SelectChangeEvent) {
    setValue("ownershipType", event.target.value, {
      shouldValidate: true,
    });
  }

  const value = watch("ownershipType");
  return (
    <div className="mb-12">
      <p className="block mb-6">مشخصات ملک متقاضی</p>
      <div className="flex gap-x-4">
        <FormControl fullWidth size="small" error={!!errors.ownershipType}>
          <InputLabel id="ownershipType-label">نوع مالکیت</InputLabel>
          <Select
            labelId="ownershipType-label"
            id="ownershipType"
            label="نوع مالکیت"
            value={value || ""}
            onChange={handleOnChange}
          >
            {ownershipOptions.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText>
            {getErrorMessage(errors.ownershipType)}
          </FormHelperText>
        </FormControl>
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
