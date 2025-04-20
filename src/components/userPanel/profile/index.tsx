import HeaderDesktop from "../header/HeaderDesktop";
import Input from "@/components/ui/Input";
import CustomButton from "@/components/ui/CustomButton";
import EditIcon from "@mui/icons-material/Edit";
import { useForm } from "react-hook-form";
import { User } from "@/types/user";
import { addUser } from "@/api/user/addUser";

export default function Profile() {
  return (
    <div className="md:border md:border-[#CBCBCB] md:rounded-lg md:p-5 md:min-h-[30rem]">
      <HeaderDesktop label="پروفایل من" style="mb-8" />
      <UserInformationForm />
    </div>
  );
}

function UserInformationForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>({
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      phone_number: "",
    },
  });

  const onSubmit = async (data: User) => {
    try {
      await addUser(data);
      alert("اطلاعات ذخیره شد!");
    } catch (err) {
      console.error(err);
      alert("خطایی رخ داد.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-1 mb-5 gap-y-4 md:grid-cols-2 md:gap-x-4 md:mb-7 md:gap-y-5">
        <Input label="نام" {...register("first_name", { required: true })} />
        <Input
          label="نام خانوادگی"
          {...register("last_name", { required: true })}
        />
        <Input label="آدرس ایمیل" {...register("email", { required: true })} />
        <Input
          label="شماره تماس"
          {...register("phone_number", { required: true })}
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
        اضافه کردن اطلاعات شخصی
      </CustomButton>
    </form>
  );
}
