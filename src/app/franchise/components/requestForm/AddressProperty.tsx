"use client";

import { getErrorMessage } from "@/utils/formHelpers";
import { useFormContext, Controller, useWatch } from "react-hook-form";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  FormHelperText,
} from "@mui/material";
import provinces from "@/data/province.json";
import cities from "@/data/cities.json";
import { useEffect } from "react";
import Input from "@/components/ui/Input";

export default function AddressProperty() {
  const {
    control,
    register,
    formState: { errors },
    setValue,
  } = useFormContext();

  const selectedProvinceId = useWatch({ control, name: "province" }) ?? "";
  const selectedCityId = useWatch({ control, name: "city" }) ?? "";

  const filteredCities = cities.filter(
    (city) => String(city.province_id) === selectedProvinceId
  );

  useEffect(() => {
    if (
      selectedCityId &&
      !filteredCities.find((c) => String(c.id) === selectedCityId)
    ) {
      setValue("city", "");
    }
  }, [selectedProvinceId, filteredCities, selectedCityId, setValue]);

  return (
    <div className="mb-12">
      <span className="block mb-6">آدرس ملک متقاضی</span>
      <div className="grid grid-cols-2 gap-4">
        <FormControl fullWidth size="small" error={!!errors.province}>
          <InputLabel id="province-label">استان</InputLabel>
          <Select
            labelId="province-label"
            id="province"
            label="استان"
            value={selectedProvinceId}
            onChange={(e) =>
              setValue("province", e.target.value, {
                shouldValidate: true,
              })
            }
          >
            <MenuItem value="">
              <p className="font-semibold">انتخاب کنید</p>
            </MenuItem>
            {provinces.map((prov) => (
              <MenuItem key={prov.id} value={String(prov.id)}>
                {prov.title}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText>
            {String(getErrorMessage(errors.province) ?? "")}
          </FormHelperText>
        </FormControl>

        <FormControl
          fullWidth
          error={!!errors.city}
          disabled={!selectedProvinceId}
          size="small"
        >
          <InputLabel id="city-label">شهر</InputLabel>
          <Controller
            name="city"
            control={control}
            rules={{ required: "شهر را انتخاب کنید" }}
            render={({ field }) => (
              <Select
                {...field}
                labelId="city-label"
                label="شهر"
                value={field.value ?? ""}
                onChange={(e) => field.onChange(e.target.value)}
              >
                <MenuItem value="">
                  <p className="font-semibold">انتخاب کنید</p>
                </MenuItem>
                {filteredCities.map((city) => (
                  <MenuItem key={city.id} value={String(city.id)}>
                    {city.title}
                  </MenuItem>
                ))}
              </Select>
            )}
          />
          <FormHelperText>
            {String(getErrorMessage(errors.city) ?? "")}
          </FormHelperText>
        </FormControl>

        {/* Region Input */}
        <Input
          label="منطقه"
          {...register("region")}
          error={!!errors.region}
          helperText={getErrorMessage(errors.region)}
        />

        {/* Address Input */}
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
