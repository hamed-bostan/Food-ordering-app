import Image, { StaticImageData } from "next/image";
import image1 from "@/assets/images/franchise/sign_01.png";
import image2 from "@/assets/images/franchise/sign_02.png";
import image3 from "@/assets/images/franchise/sign_03.png";
import image4 from "@/assets/images/franchise/sign_04.png";

type HighlightDetail = {
  id: number;
  image: StaticImageData;
  text: string;
};

const highlightDetails: HighlightDetail[] = [
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

export default function Highlights() {
  return (
    <div className="grid grid-cols-4 place-items-center py-9">
      {highlightDetails.map((item) => (
        <div
          key={item.id}
          className="flex flex-col items-center gap-y-4 min-h-36"
        >
          <Image src={item.image} alt={item.text} className="w-20 h-20" />
          <span className="text-center">{item.text}</span>
        </div>
      ))}
    </div>
  );
}
