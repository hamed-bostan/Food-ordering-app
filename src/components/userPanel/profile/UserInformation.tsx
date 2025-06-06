"use client";

import Input from "@/components/ui/Input";
import CustomButton from "@/components/ui/CustomButton";
import EditIcon from "@mui/icons-material/Edit";
import { useFormContext } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ProfileSchema } from "@/schemas/profile-schema";
import useNumericField from "@/hooks/useNumericField";

type UserIdProps = {
  userId: string; // pass logged-in user's id here
};

export default function UserInformation({ userId }: UserIdProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useFormContext<ProfileSchema>();

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (data: ProfileSchema) => {
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

  function onSubmit(data: ProfileSchema) {
    mutation.mutate(data);
  }

  const phone = useNumericField("phone_number", 11, "09");

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-1 mb-5 gap-y-4 md:grid-cols-2 md:gap-x-4 md:mb-7 md:gap-y-5 min-h-36">
        <Input label="نام و نام خانوادگی" {...register("name")} />
        <Input
          label="شماره تماس"
          type="text"
          {...phone.registerProps}
          value={phone.value}
          error={phone.error}
          helperText={phone.helperText}
          onChange={phone.onChange}
          onFocus={phone.onFocus}
          onBlur={phone.onBlur}
          borderColor={phone.borderColor}
          inputProps={phone.inputProps}
        />
        <Input
          label="ایمیل"
          {...register("email")}
          error={!!errors.email}
          helperText={errors.email?.message}
        />
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
