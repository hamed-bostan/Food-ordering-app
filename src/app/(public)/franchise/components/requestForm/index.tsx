"use client";

import { franchiseFormSchema, FranchiseFormValues } from "@/domain/franchise-form-schema";
import AddressProperty from "./AddressProperty";
import ApplicantPropertyDetails from "./ApplicantPropertyDetails";
import FacilityProperty from "./FacilityProperty";
import IndividualProfile from "./IndividualProfile";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import provinces from "@/data/province.json";
import cities from "@/data/cities.json";
import { FranchiseDialog } from "./FranchiseDialog";
import { useFranchiseDialog } from "@/context/franchise-dialog.context";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function RequestForm() {
  const { openFranchiseDialog, setFranchiseSubmittedData } = useFranchiseDialog();

  const methods = useForm<FranchiseFormValues>({
    resolver: zodResolver(franchiseFormSchema),
    mode: "onBlur",
    defaultValues: {
      nationalId: "0",
      phone: "09",
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

  const onSubmit = async (data: FranchiseFormValues) => {
    try {
      const provinceName = provinces.find((prov) => String(prov.id) === data.province)?.title || "نامشخص";
      const cityName = cities.find((city) => String(city.id) === data.city)?.title || "نامشخص";

      const submission = { ...data, province: provinceName, city: cityName };

      const res = await axios.post("/api/franchise", submission);

      setFranchiseSubmittedData(res.data.data);
      openFranchiseDialog();
      toast.success("اطلاعات شما با موفقیت ثبت شد");
      methods.reset();
    } catch (error: unknown) {
      console.error("Submission failed:", error);

      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || "ارسال اطلاعات با خطا مواجه شد");
      } else if (error instanceof Error) {
        toast.error(error.message || "ارسال اطلاعات با خطا مواجه شد");
      } else {
        toast.error("خطای ناشناخته در ارسال اطلاعات");
      }
    }
  };

  return (
    <>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="border border-[#CBCBCB] py-8 px-6 rounded-md my-9">
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
