import CustomButton from "../ui/CustomButton";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import {
  Person2Outlined,
  TrendingUpOutlined,
  WifiOutlined,
  EventNoteOutlined,
  SvgIconComponent,
} from "@mui/icons-material";
import Image from "next/image";
import image1 from "@/assets/images/bannerImages/banner-02.webp";

type CardItem = {
  id: number;
  icon: SvgIconComponent;
  text: string;
};

const cardItems: CardItem[] = [
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

export default function DescriptionSection() {
  return (
    <section className="relative px-5 py-4 md:h-80 md:grid md:grid-cols-2 md:place-items-center lg:gap-x-10 lg:px-10 2xl:px-28">
      <Image
        src={image1}
        alt="description background"
        fill
        className="object-cover object-center -z-10"
        priority
      />
      <DescriptionDetails />
      <CardSection data={cardItems} />
    </section>
  );
}

function DescriptionDetails() {
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

type CardSectionProps = {
  data: CardItem[];
};

function CardSection({ data }: CardSectionProps) {
  return (
    <ul className="grid grid-cols-2 gap-x-12 gap-y-4 md:gap-6 md:mr-auto">
      {data.map((item) => (
        <li
          key={item.id}
          className="flex flex-col items-center gap-y-1 md:gap-y-3 text-[#FFFFFF]"
        >
          <item.icon sx={{ fontSize: { xs: 23, md: 28 } }} />
          <p className="block text-xs text-center md:text-sm">
            {item.text}
          </p>
        </li>
      ))}
    </ul>
  );
}
