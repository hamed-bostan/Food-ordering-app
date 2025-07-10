import Image from "next/image";
import image1 from "@/assets/images/bannerImages/banner-09.webp";

export default function Details() {
  return (
    <section className="container px-5 py-4 mx-auto lg:px-10 2xl:px-28 ">
      <h2 className="font-bold mb-2 text-[#353535] 2xl:text-lg">
        درباره ما
      </h2>
      <div className="grid md:grid-cols-2 gap-y-5 md:gap-x-10">
        <div className="text-xs text-[#717171] xl:gap-x-14 2xl:gap-x-32 md:text-sm lg:text-base">
          <p className="text-justify">
            رستوران‌های زنجیره‌ای ترخینه در سال ۱۳۶۸ افتتاح گردیده‌اند و در طی
            این سال‌ها همواره با ارائه غذاهای باکیفیت و سرویس سریع و به موقع در
            تلاش برای جلب رضایت مشتریان خود بوده‌اند. در طی این سال‌ها اولویت
            جلب رضایت مشتریان بوده است.
          </p>
          <p className="text-justify">
            دراین خصوص ترخینه همیشه در تلاش بوده تا در طی این زمان‌ها کیفیت
            غذاهای خود را در بهترین حالت نگه داشته و حتی با نوسانات قیمت‌های
            مواد اولیه در بازار قیمت خود را ثابت نگه داشته است. ترخینه شعبات
            خودرا افتتاح کرده که بسیار شیک و مدرن می‌باشند و برای برگزاری
            جشن‌های کوچک و بزرگ شما مشتریان عزیز توانایی پذیرایی با کیفیت بالا
            را دارند. سالن پذیرایی شعبات در دو طبقه مجزا به همراه راه پله مدرن و
            آسانسور برای افراد کم‌توان و سالخورده آماده ارائه سرویس به شما
            عزیزان می‌باشند. چشم انداز: در آینده ای نزدیک تالار پذیرایی شعبات
            راه اندازی شده و آماده برگزاری جشن‌ها و مراسم‌های بزرگ شما خواهند
            بود. به امید آن روز که همه ایرانیان سالم و سلامت باشند.
          </p>
        </div>
        <Image
          src={image1}
          alt="About us image"
          className="object-cover object-center w-4/5 h-full mx-auto rounded-md md:w-full 2xl:h-4/5"
        />
      </div>
    </section>
  );
}
