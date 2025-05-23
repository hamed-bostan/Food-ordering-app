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

export default function RequestForm() {
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
    },
  });

  function onSubmit(data: FranchiseFormValues) {
    console.log("Submitted Data:", data);
  }

  return (
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
  );
}
