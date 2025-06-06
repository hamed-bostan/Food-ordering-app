import { StaticImageData } from "next/image";
import BranchCard from "./BranchCard";
import image1 from "@/assets/images/branchImages/branch-01.jpg";
import image2 from "@/assets/images/branchImages/branch-02.jpg";
import image3 from "@/assets/images/branchImages/branch-03.jpg";
import image4 from "@/assets/images/branchImages/branch-04.jpg";

export type Branch = {
  id: number;
  image: StaticImageData;
  title: string;
  address: string;
  phoneNumber: string;
  workTime: string;
};

const branchesData: Branch[] = [
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
    address: "چالوس، خیابان ۱۷ شهریور، بعد کوچه کوروش، جنب داروخانه",
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

export default function BranchList() {
  return (
    <div className="container px-5 py-6 mx-auto lg:px-10 2xl:px-28">
      <ul className="flex flex-col gap-y-7">
        {branchesData.map((item) => (
          <li key={item.id}>
            <BranchCard data={item} />
          </li>
        ))}
      </ul>
    </div>
  );
}
