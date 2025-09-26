"use client";

import Input from "@/presentation/components/Input";
import CustomButton from "@/presentation/components/CustomButton";
import EditIcon from "@mui/icons-material/Edit";
import { useFormContext } from "react-hook-form";
import { toast } from "react-toastify";
import useNumericField from "@/hooks/numeric-field.hook";
import { updateUserProfile } from "@/infrastructure/apis/user.api";
import { getSession } from "next-auth/react";
import { UserProfileType } from "@/application/schemas/profile-schema";

type UserIdProps = {
  userId: string; // pass logged-in user's id here
};

function isAddress(val: unknown): val is { value: string; coords: [number, number] } {
  return typeof val === "object" && val !== null && "value" in val && "coords" in val;
}

export default function UserProfileForm({ userId }: UserIdProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useFormContext<UserProfileType>();

  const phone = useNumericField("phoneNumber", 11, "09");

  const updateUser = async (data: UserProfileType) => {
    try {
      const session = await getSession();
      const token = session?.accessToken;
      if (!token) throw new Error("No access token found");

      const { message, result } = await updateUserProfile(userId, data, token);

      const normalizedUser = {
        name: result.name ?? undefined,
        phoneNumber: result.phoneNumber ?? undefined,
        email: result.email ?? undefined,
        image: result.image ?? undefined,
      };

      toast.success(message);
      reset(normalizedUser);
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("خطا در بروزرسانی اطلاعات");
      }
    }
  };

  const onSubmit = (data: UserProfileType) => {
    const filtered: UserProfileType = {};

    Object.entries(data).forEach(([key, value]) => {
      if (key === "address") {
        if (isAddress(value) && value.value.trim()) {
          filtered.address = value;
        }
      } else if (typeof value === "string" && value.trim()) {
        // TS infers key is string, so we need narrowing
        filtered[key as Exclude<keyof UserProfileType, "address">] = value;
      }
    });

    updateUser(filtered);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-1 mb-5 gap-y-4 md:grid-cols-2 md:gap-x-4 md:mb-7 md:gap-y-5 min-h-36">
        <Input label="نام و نام خانوادگی" {...register("name")} />

        <Input
          label="شماره تماس"
          type="text"
          {...phone.registerProps}
          error={phone.error}
          helperText={phone.helperText}
          onChange={phone.onChange}
          onFocus={phone.onFocus}
          onBlur={phone.onBlur}
          borderColor={phone.borderColor}
          inputProps={phone.inputProps}
        />

        <Input label="ایمیل" {...register("email")} error={!!errors.email} helperText={errors.email?.message} />

        <Input
          label="تاریخ"
          type="date"
          {...register("date")}
          error={!!errors.date}
          helperText={errors.date?.message}
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
