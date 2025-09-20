import image1 from "@/assets/images/franchise/sign_01.png";
import image2 from "@/assets/images/franchise/sign_02.png";
import image3 from "@/assets/images/franchise/sign_03.png";
import image4 from "@/assets/images/franchise/sign_04.png";
import { HighlightDetailsProp } from "@/types/franchise.types";
import { PrivilegeDetailsProp } from "@/types/franchise.types";

export const highlightDetails: HighlightDetailsProp[] = [
  {
    id: 1,
    image: image1,
    text: "بیش از 20 شعبه فعال در سراسر کشور",
  },
  {
    id: 2,
    image: image2,
    text: "تسهیلات راه‌اندازی رستوران و تجهیز آن",
  },
  {
    id: 3,
    image: image3,
    text: "طرح‌های تشویقی ارتقای فروش",
  },
  {
    id: 4,
    image: image4,
    text: "اعطای دستورالعمل پخت غذاها",
  },
];

export const PrivilegeDetails: PrivilegeDetailsProp[] = [
  { id: 1, text: "استفاده از برند شناخته شده ترخینه" },
  { id: 2, text: "مشاوره در امور حقوقی، مالی و مالیاتی" },
  { id: 3, text: "به حداقل رساندن ریسک سرمایه گذاری" },
  { id: 4, text: "پشتیبانی بازاریابی و منابع انسانی" },
  { id: 5, text: "تسریع روند بازگشت سرمایه" },
  { id: 6, text: "دریافت مشاوره جهت تامین مواد اولیه و تجهیزات" },
  { id: 7, text: "مشاوره های تخصصی جهت مدیریت رستوران" },
  { id: 8, text: "طرح های تشویقی برای ارتقا فروش" },
];
