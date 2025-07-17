import CustomButton from "@/components/ui/CustomButton";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

export default function DescriptionDetails() {
  return (
    <section className="text-[#FFFFFF] mb-6 md:mb-0">
      <h2 className="block mb-2 md:text-lg md:mb-4">
        رستوران‌های زنجیره‌ای ترخینه
      </h2>
      <p className="mb-3 text-xs text-justify md:text-sm md:mb-4">
        مهمان‌نوازی یکی از مهم‌ترین مشخصه‌های ایرانیان است و باعث افتخار ماست که
        بیش از 20 سال است خدمت‌گزار مردم شریف ایران هستیم. ما در رستوران‌های
        زنجیره‌ای ترخینه همواره تلاش کردیم که در محیطی اصیل بر پایه معماری و
        طراحی مدرن در کنار طبیعتی دلنواز، غذایی سالم و درخور شان شما عزیزان
        ارائه دهیم.
      </p>
      <CustomButton
        endIcon={<ArrowBackIosIcon />}
        variant="outlined"
        sx={{
          display: "flex",
          borderColor: "#FFFFFF",
          width: { sx: "9.5rem", md: "11.5rem" },
          backgroundColor: "transparent",
          marginLeft: "auto",
          "&:hover": { backgroundColor: "#326343" },
          color: "#FFFFFF",
        }}
      >
        اطلاعات بیشتر
      </CustomButton>
    </section>
  );
}
