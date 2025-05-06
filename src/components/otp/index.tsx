"use client";

import Image from "next/image";
import logo from "@/assets/images/icons/Logo.png";
import Input from "../ui/Input";
import CustomButton from "../ui/CustomButton";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import axios from "axios";

const schema = z.object({
  phone: z
    .string()
    .min(11, "شماره باید ۱۱ رقم باشد")
    .regex(/^09\d{9}$/, "شماره موبایل معتبر نیست"),
});

type FormData = z.infer<typeof schema>;

export default function Otp() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async ({ phone }: FormData) => {
    setLoading(true);
    setMessage("");

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    try {
      const { data } = await axios.post("/api/auth/send-otp", {
        phone,
        otp,
      });

      setMessage("کد با موفقیت ارسال شد.");
    } catch (error: any) {
      console.error("Send OTP error:", error);
      setMessage(error.response?.data?.error || "ارسال با خطا مواجه شد.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center pb-20 pt-14">
      <Image src={logo} alt="logo image" className="h-20 mb-20 w-52" />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col mb-6 gap-y-8"
      >
        <p className="text-[#353535] font-[700] text-center text-lg">
          ورود / ثبت‌نام
        </p>
        <p className="text-[#717171]  text-center">
          شماره همراه خود را وارد کنید.
        </p>

        <Input
          {...register("phone")}
          error={!!errors.phone}
          label="شماره همراه"
          sx={{ width: "20rem" }}
          size="medium"
        />
        {errors.phone && (
          <p className="text-sm text-red-500">{errors.phone.message}</p>
        )}
        <CustomButton type="submit" disabled={loading}>
          {loading ? "در حال ارسال..." : "ارسال کد"}
        </CustomButton>
        {message && <p className="text-sm text-center">{message}</p>}
      </form>
      <p className="text-[#353535] text-xs text-center">
        ورود و عضویت در ترخینه به منزله قبول قوانین و مقررات است.
      </p>
    </div>
  );
}
