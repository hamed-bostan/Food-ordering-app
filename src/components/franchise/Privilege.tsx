import Image from "next/image";

type PrivilegeDetail = {
  id: number;
  text: string;
};

const PrivilegeDetails: PrivilegeDetail[] = [
  { id: 1, text: "استفاده از برند شناخته شده ترخینه" },
  { id: 2, text: "مشاوره در امور حقوقی، مالی و مالیاتی" },
  { id: 3, text: "به حداقل رساندن ریسک سرمایه گذاری" },
  { id: 4, text: "پشتیبانی بازاریابی و منابع انسانی" },
  { id: 5, text: "تسریع روند بازگشت سرمایه" },
  { id: 6, text: "دریافت مشاوره جهت تامین مواد اولیه و تجهیزات" },
  { id: 7, text: "مشاوره های تخصصی جهت مدیریت رستوران" },
  { id: 8, text: "طرح های تشویقی برای ارتقا فروش" },
];

export default function Privilege() {
  return (
    <div className="py-9">
      <h2 className="font-bold text-center mb-6">مزیت دریافت نمایندگی</h2>
      <div className="grid grid-cols-2 mx-auto max-w-2xl gap-y-4">
        {PrivilegeDetails.map((item) => (
          <div key={item.id} className="flex items-center gap-x-1 ">
            <Image
              src="/assets/images/icons/franchise-icon.svg"
              alt="franchise icon"
              width={25}
              height={25}
              className="h-4 w-4"
            />
            <span className="text-nowrap">{item.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
