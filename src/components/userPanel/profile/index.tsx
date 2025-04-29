import HeaderDesktop from "../header/HeaderDesktop";
import Input from "@/components/ui/Input";
import CustomButton from "@/components/ui/CustomButton";
import EditIcon from "@mui/icons-material/Edit";
import { useForm } from "react-hook-form";
import axios from "axios";

type FormData = {
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
};

export default function Profile() {
  return (
    <div className="md:border md:border-[#CBCBCB] md:rounded-lg md:p-5 md:min-h-[30rem]">
      <HeaderDesktop label="پروفایل من" style="mb-8" />
      <UserInformationForm />
    </div>
  );
}

function UserInformationForm() {
  const { register, handleSubmit, reset } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    try {
      await axios.post("/api/user-profile", data);
      alert("User added successfully");
      reset();
    } catch (error) {
      console.error(error);
      alert("Failed to add user");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-1 mb-5 gap-y-4 md:grid-cols-2 md:gap-x-4 md:mb-7 md:gap-y-5">
        <Input label="نام" {...register("first_name")} />
        <Input label="نام خانوادگی" {...register("last_name")} />
        <Input label="آدرس ایمیل" {...register("email")} />
        <Input label="شماره تماس" {...register("phone_number")} />
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
        اضافه کردن اطلاعات شخصی
      </CustomButton>
    </form>
  );
}
