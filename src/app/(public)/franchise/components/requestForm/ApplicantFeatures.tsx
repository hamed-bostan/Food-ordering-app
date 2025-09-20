import { useFormContext, Controller } from "react-hook-form";
import Checkbox from "@mui/material/Checkbox";
import { FormControlLabel } from "@mui/material";

export default function ApplicantFeatures() {
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
              sx={{ color: "#717171", width: "fit-content" }}
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
              sx={{ color: "#717171", width: "fit-content" }}
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
              sx={{ color: "#717171", width: "fit-content" }}
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
              sx={{ color: "#717171", width: "fit-content" }}
            />
          )}
        />
      </div>
    </div>
  );
}
