import { StaticImageData } from "next/image";
import image1 from "@/assets/images/firstPageImages/01.png";
import image2 from "@/assets/images/firstPageImages/02.png";
import image3 from "@/assets/images/firstPageImages/03.png";
import image4 from "@/assets/images/firstPageImages/04.png";

type MenuItem = {
  id: number;
  image: StaticImageData;
  text: string;
};

export const menuInformation: MenuItem[] = [
  {
    id: 1,
    image: image1,
    text: "غذای اصلی",
  },
  {
    id: 2,
    image: image2,
    text: "پیش غذا",
  },
  {
    id: 3,
    image: image3,
    text: "دسر",
  },
  {
    id: 4,
    image: image4,
    text: "نوشیدنی",
  },
];
