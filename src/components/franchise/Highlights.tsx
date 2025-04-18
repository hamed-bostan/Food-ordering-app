import Image from "next/image";

type HighlightDetail = {
  id: number;
  image: string;
  text: string;
};

const highlightDetails: HighlightDetail[] = [
  {
    id: 1,
    image: "/assets/images/franchise/sign_01.png",
    text: "بیش از 20 شعبه فعال در سراسر کشور",
  },
  {
    id: 2,
    image: "/assets/images/franchise/sign_02.png",
    text: "تسهیلات راه‌اندازی رستوران و تجهیز آن",
  },
  {
    id: 3,
    image: "/assets/images/franchise/sign_03.png",
    text: "طرح‌های تشویقی ارتقای فروش",
  },
  {
    id: 4,
    image: "/assets/images/franchise/sign_04.png",
    text: "اعطای دستورالعمل پخت غذاها",
  },
];

export default function Highlights() {
  return (
    <div className="grid grid-cols-4 place-items-center py-9">
      {highlightDetails.map((item) => (
        <div
          key={item.id}
          className="flex flex-col gap-y-4 items-center min-h-36"
        >
          <Image
            src={item.image}
            alt={item.text}
            width={110}
            height={110}
            className="h-20 w-20"
          />
          <span className="text-center">{item.text}</span>
        </div>
      ))}
    </div>
  );
}
