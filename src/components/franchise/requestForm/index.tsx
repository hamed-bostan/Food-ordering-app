"use client";

import {
  franchiseFormSchema,
  FranchiseFormValues,
} from "@/schemas/franchise-form-schema";
import AddressProperty from "./AddressProperty";
import ApplicantPropertyDetails from "./ApplicantPropertyDetails";
import FacilityProperty from "./FacilityProperty";
import IndividualProfile from "./IndividualProfile";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import provinces from "@/data/province.json";
import cities from "@/data/cities.json";
import { FranchiseDialog } from "./FranchiseDialog";
import { useFranchiseDialog } from "@/context/FranchiseContext";
import axios from "axios";

export default function RequestForm() {
  const { setFranchiseDataAndOpenDialog } = useFranchiseDialog(); // Access the context values

  const methods = useForm<FranchiseFormValues>({
    resolver: zodResolver(franchiseFormSchema),
    mode: "onBlur",
    defaultValues: {
      nationalId: "0", // required for useNumericField to start with correct leading
      phone: "09", // required to ensure useNumericField works correctly
      hasBusinessLicense: false,
      hasParking: false,
      hasKitchen: false,
      hasStorage: false,
      province: "",
      city: "",
      region: "",
      address: "",
    },
  });

  async function onSubmit(data: FranchiseFormValues) {
    const provinceName =
      provinces.find((prov) => String(prov.id) === data.province)?.title ||
      "نامشخص";
    const cityName =
      cities.find((city) => String(city.id) === data.city)?.title || "نامشخص";

    const submission = {
      ...data,
      province: provinceName,
      city: cityName,
    };

    try {
      const res = await axios.post("/api/franchise", submission);

      const submitted = res.data.data;
      setFranchiseDataAndOpenDialog(submitted);
    } catch (err) {
      console.error("Submission failed:", err);
    }
  }

  return (
    <>
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className="border border-[#CBCBCB] py-8 px-6 rounded-md my-9"
        >
          <span className="block text-center mb-11">فرم درخواست نمایندگی</span>
          <IndividualProfile />
          <AddressProperty />
          <ApplicantPropertyDetails />
          <FacilityProperty />
        </form>
      </FormProvider>
      <FranchiseDialog />
    </>
  );
}
