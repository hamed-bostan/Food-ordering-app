import Input from "@/components/ui/Input";
import useNumericField from "@/hooks/useNumericField";
import { getErrorMessage } from "@/lib/utils/formHelpers";
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

  const propertyArea = useNumericField("propertyArea", 5); // up to 99999
  const buildingAge = useNumericField("buildingAge", 3); // up to 999

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
            sx={{
              "& .MuiSelect-select": {
                paddingY: "0.45rem",
              },
            }}
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
          type="text"
          {...propertyArea.registerProps}
          value={propertyArea.value}
          onChange={propertyArea.onChange}
          onFocus={propertyArea.onFocus}
          onBlur={propertyArea.onBlur}
          error={propertyArea.error}
          helperText={propertyArea.helperText}
          inputProps={propertyArea.inputProps}
        />

        <Input
          label="سن بنا"
          type="text"
          {...buildingAge.registerProps}
          value={buildingAge.value}
          onChange={buildingAge.onChange}
          onFocus={buildingAge.onFocus}
          onBlur={buildingAge.onBlur}
          error={buildingAge.error}
          helperText={buildingAge.helperText}
          inputProps={buildingAge.inputProps}
        />
      </div>
    </div>
  );
}
