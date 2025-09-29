import CustomButton from "@/presentation/components/CustomButton";
import Input from "@/presentation/components/Input";

export default function ContactForm() {
  return (
    <div className="hidden md:block">
      <h2 className="text-base mb-3 font-medium text-[#fff]">پیام به ترخینه</h2>
      <form>
        <div className="grid grid-cols-2 grid-rows-3 mb-5 gap-x-5 gap-y-2">
          <Input label="نام و نام خانوادگی" labelColor="#EDEDED" textColor="#EDEDED" borderColor="#717171" />
          <Input label="شماره تماس" labelColor="#EDEDED" textColor="#EDEDED" borderColor="#717171" />
          <Input label="آدرس ایمیل (اختیاری)" labelColor="#EDEDED" textColor="#EDEDED" borderColor="#717171" />
          <Input
            label="پیام شما"
            labelColor="#EDEDED"
            textColor="#EDEDED"
            borderColor="#717171"
            multiline
            rows={5}
            className="col-start-2 row-start-1 row-span-full"
          />
        </div>
        <CustomButton
          type="submit"
          variant="outlined"
          sx={{
            display: "flex",
            marginLeft: "auto",
            width: { xs: "33%", lg: "25%" },
            backgroundColor: "transparent",
            "&:hover": { backgroundColor: "#717171" },
            borderColor: "#717171",
            color: "#EDEDED",
          }}
        >
          ارسال پیام
        </CustomButton>
      </form>
    </div>
  );
}
