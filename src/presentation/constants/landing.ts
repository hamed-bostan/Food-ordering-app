import image1 from "@/assets/images/branchImages/branch-01.jpg";
import image2 from "@/assets/images/branchImages/branch-02.jpg";
import image3 from "@/assets/images/branchImages/branch-03.jpg";
import image4 from "@/assets/images/branchImages/branch-04.jpg";
import { BranchProps } from "@/types/landing.types";
import { CardItemProps } from "@/types/landing.types";
import { Person2Outlined, TrendingUpOutlined, WifiOutlined, EventNoteOutlined } from "@mui/icons-material";
import { StaticImageData } from "next/image";
import image5 from "@/assets/images/firstPageImages/01.png";
import image6 from "@/assets/images/firstPageImages/02.png";
import image7 from "@/assets/images/firstPageImages/03.png";
import image8 from "@/assets/images/firstPageImages/04.png";

export const branchList: BranchProps[] = [
  {
    id: 1,
    image: image1,
    title: "شعبه اکباتان",
    address: "شهرک اکباتان، فاز ۳، مجتمع تجاری کوروش، طبقه سوم",
    phoneNumber: "۰۲۱-۵۴۸۹۱۲۵۰-۵۱",
    workTime: "همه روزه از ساعت 12 تا 23 بجز روزهای تعطیل",
  },
  {
    id: 2,
    image: image2,
    title: "شعبه چالوس",
    address: "چالوس، خیابان ۱۷ شهریور، بعد کوچه کوروش ",
    phoneNumber: "۰۲۱-۵۴۸۹۱۲۵۲-۵۳",
    workTime: "همه روزه از ساعت 12 تا 23 بجز روزهای تعطیل",
  },
  {
    id: 3,
    image: image3,
    title: "شعبه اقدسیه",
    address: "خیابان اقدسیه ، نرسیده به میدان خیام، پلاک ۸",
    phoneNumber: "۰۲۱-۵۴۸۹۱۲۵۴-۵۵",
    workTime: "همه روزه از ساعت 12 تا 23 بجز روزهای تعطیل",
  },
  {
    id: 4,
    image: image4,
    title: "شعبه ونک",
    address: "میدان ونک، خیابان فردوسی، نبش کوچه نیلوفر، پلاک ۲۶",
    phoneNumber: "۰۲۱-۵۴۸۹۱۲۵۶-۵۷",
    workTime: "همه روزه از ساعت 12 تا 23 بجز روزهای تعطیل",
  },
];

export const cardItems: CardItemProps[] = [
  {
    id: 1,
    icon: Person2Outlined,
    text: "پرسنلی مجرب و حرفه‌ای",
  },
  {
    id: 2,
    icon: TrendingUpOutlined,
    text: "کیفیت بالای غذاها",
  },
  {
    id: 3,
    icon: WifiOutlined,
    text: "محیطی دلنشین و آرام",
  },
  {
    id: 4,
    icon: EventNoteOutlined,
    text: "منوی متنوع",
  },
];

type descriptionContentProps = {
  title: string;
  paragraph: string;
  buttonLabel: string;
};

export const descriptionContent: descriptionContentProps = {
  title: "رستوران‌های زنجیره‌ای ترخینه",
  paragraph:
    "مهمان‌نوازی یکی از مهم‌ترین مشخصه‌های ایرانیان است و باعث افتخار ماست که بیش از 20 سال است خدمت‌گزار مردم شریف ایران هستیم. ما در رستوران‌های زنجیره‌ای ترخینه همواره تلاش کردیم که در محیطی اصیل بر پایه معماری و طراحی مدرن در کنار طبیعتی دلنواز، غذایی سالم و درخور شان شما عزیزان ارائه دهیم.",
  buttonLabel: "اطلاعات بیشتر",
};



export type MenuItemProps = {
  id: number;
  image: StaticImageData;
  text: string;
};

export const menuInformation: MenuItemProps[] = [
  {
    id: 1,
    image: image5,
    text: "غذای اصلی",
  },
  {
    id: 2,
    image: image6,
    text: "پیش غذا",
  },
  {
    id: 3,
    image: image7,
    text: "دسر",
  },
  {
    id: 4,
    image: image8,
    text: "نوشیدنی",
  },
];
