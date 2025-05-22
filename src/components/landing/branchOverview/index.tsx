import image1 from "@/assets/images/branchImages/branch-01.jpg";
import image2 from "@/assets/images/branchImages/branch-02.jpg";
import image3 from "@/assets/images/branchImages/branch-03.jpg";
import image4 from "@/assets/images/branchImages/branch-04.jpg";
import BranchItem from "./BranchItem";
import { StaticImageData } from "next/image";

export type Branch = {
  id: number;
  image: StaticImageData;
  title: string;
  address: string;
  phoneNumber: string;
  workTime: string;
};

const branchList: Branch[] = [
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

export default function BranchOverview() {
  return (
    <section className="px-5 py-6 lg:px-10 2xl:px-28">
      <h2 className="block text-center mb-3 text-[#353535] md:text-lg font-bold md:mb-5">
        ترخینه گردی
      </h2>
      <BranchListContainer branches={branchList} />
    </section>
  );
}

type BranchListContainerProps = {
  branches: Branch[];
};

function BranchListContainer({ branches }: BranchListContainerProps) {
  return (
    <ul className="flex flex-col gap-y-3 md:grid md:grid-cols-2 md:gap-5 xl:grid-cols-4 list-none">
      {branches.map((branch) => (
        <li
          key={branch.id}
          className="grid grid-cols-2 grid-rows-2 border border-[#CBCBCB] rounded-sm overflow-hidden md:grid-cols-1 md:grid-rows-[auto_1fr] md:rounded-lg group md:hover:border-[#315F41] md:hover:shadow-lg"
        >
          <BranchItem branch={branch} />
        </li>
      ))}
    </ul>
  );
}
