"use client";

import HeaderDesktop from "../header/HeaderDesktop";
import Input from "@/components/ui/Input";
import CustomButton from "@/components/ui/CustomButton";
import EditIcon from "@mui/icons-material/Edit";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";
import { CircularProgress } from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type FormData = {
  name: string;
  phone_number: string;
  email: string;
};

type UserIdProps = {
  userId: string; // pass logged-in user's id here
};

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
    return <p className="text-center text-red-500">User not found.</p>;
  }

  const userId = session.user.id;

  return (
    <div className="md:border md:border-[#CBCBCB] md:rounded-lg md:p-5 md:min-h-[30rem]">
      <HeaderDesktop label="پروفایل من" style="mb-8" />
      <UserInformationForm userId={userId} />
    </div>
  );
}

function UserInformationForm({ userId }: UserIdProps) {
  const { register, handleSubmit, reset } = useForm<FormData>();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (data: FormData) => {
      const response = await axios.post("/api/user/update", {
        userId,
        ...data,
      });
      return response.data;
    },
    onSuccess: (data) => {
      toast.success(data.message || "User info updated!");
      reset();
      queryClient.invalidateQueries({ queryKey: ["user", userId] });
    },
    onError: (error: any) => {
      toast.error(
        error.response?.data?.message ||
          "Failed to update user info. Please try again."
      );
    },
  });

  function onSubmit(data: FormData) {
    mutation.mutate(data);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-1 mb-5 gap-y-4 md:grid-cols-2 md:gap-x-4 md:mb-7 md:gap-y-5">
        <Input label="نام و نام خانوادگی" {...register("name")} />
        <Input label="شماره تماس" {...register("phone_number")} />
        <Input label="ایمیل" {...register("email")} />
      </div>
      <CustomButton
        type="submit"
        startIcon={<EditIcon />}
        variant="outlined"
        sx={{
          backgroundColor: "transparent",
          display: "flex",
          mx: "auto",
          borderColor: "#417F56",
          color: "#417F56",
          "&:hover": { color: "#fff", backgroundColor: "#417F56" },
        }}
      >
        بروز رسانی اطلاعات شخصی
      </CustomButton>
    </form>
  );
}
