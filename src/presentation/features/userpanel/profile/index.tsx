"use client";

import HeaderDesktop from "../shared/header/HeaderDesktop";
import { FormProvider, useForm } from "react-hook-form";
import { useSession } from "next-auth/react";
import { CircularProgress } from "@mui/material";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserProfileType, userProfileSchema } from "@/application/schemas/profile-schema";
import UserProfileForm from "./UserProfileForm";

export default function Profile() {
  const { data: session, status } = useSession();

  // Show spinner while session is loading
  if (status === "loading") {
    return (
      <div className="flex items-center justify-center h-40">
        <CircularProgress />
      </div>
    );
  }

  if (!session?.user?.id) {
    return <p className="text-center text-red-500">کاربر یافت نشد.</p>;
  }

  const userId = session.user.id;

  const methods = useForm<UserProfileType>({
    resolver: zodResolver(userProfileSchema),
  });

  return (
    <div className="md:border md:border-[#CBCBCB] md:rounded-lg md:p-5 md:min-h-[30rem]">
      <HeaderDesktop label="پروفایل من" style="mb-8" />
      <FormProvider {...methods}>
        <UserProfileForm userId={userId} />
      </FormProvider>
    </div>
  );
}
