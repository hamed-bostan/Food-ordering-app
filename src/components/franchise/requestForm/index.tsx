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
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useMutation } from "@tanstack/react-query";

export default function RequestForm() {
  const { openFranchiseDialog, setFranchiseSubmittedData } =
    useFranchiseDialog(); // Access the context values

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

  const mutation = useMutation({
    mutationFn: async (data: FranchiseFormValues) => {
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

      const res = await axios.post("/api/franchise", submission);
      return res.data.data; // This will become the argument in onSuccess
    },
    onSuccess: (submitted) => {
      setFranchiseSubmittedData(submitted);
      openFranchiseDialog();
      toast.success("اطلاعات شما با موفقیت ثبت شد");
      methods.reset();
    },
    onError: (error) => {
      console.error("Submission failed:", error);
      toast.error("ارسال اطلاعات با خطا مواجه شد");
    },
  });

  return (
    <>
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit((data) => mutation.mutate(data))}
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
