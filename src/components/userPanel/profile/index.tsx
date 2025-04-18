import HeaderDesktop from "../header/HeaderDesktop";
import Input from "@/components/ui/Input";
import CustomButton from "@/components/ui/CustomButton";
import EditIcon from "@mui/icons-material/Edit";

export default function Profile() {
  return (
    <div className="md:border md:border-[#CBCBCB] md:rounded-lg md:p-5 md:min-h-[30rem]">
      <HeaderDesktop label="پروفایل من" style="mb-8" />
      <UserInformationForm />
    </div>
  );
}

function UserInformationForm() {
  return (
    <>
      <div className="grid grid-cols-1 gap-y-4 mb-5 md:grid-cols-2 md:gap-x-4 md:mb-7 md:gap-y-5">
        <Input label="نام" />
        <Input label="نام خانوادگی" />
        <Input label="آدرس ایمیل" />
        <Input label="شماره تماس" />
        <Input label="تاریخ تولد (اختیاری)" />
        <Input label="نام نمایشی" />
      </div>
      <CustomButton
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
        ویرایش اطلاعات شخصی
      </CustomButton>
    </>
  );
}
