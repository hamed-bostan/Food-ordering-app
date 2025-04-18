import BranchCard from "./BranchCard";

export type Branch = {
  id: number;
  image: string;
  title: string;
  address: string;
  phoneNumber: string;
  workTime: string;
};

const branchesData: Branch[] = [
  {
    id: 1,
    image: "/assets/images/branchImages/branch-01.jpg",
    title: "شعبه اکباتان",
    address: "شهرک اکباتان، فاز ۳، مجتمع تجاری کوروش، طبقه سوم",
    phoneNumber: "۰۲۱-۵۴۸۹۱۲۵۰-۵۱",
    workTime: "همه روزه از ساعت 12 تا 23 بجز روزهای تعطیل",
  },
  {
    id: 2,
    image: "/assets/images/branchImages/branch-02.jpg",
    title: "شعبه چالوس",
    address: "چالوس، خیابان ۱۷ شهریور، بعد کوچه کوروش، جنب داروخانه",
    phoneNumber: "۰۲۱-۵۴۸۹۱۲۵۲-۵۳",
    workTime: "همه روزه از ساعت 12 تا 23 بجز روزهای تعطیل",
  },
  {
    id: 3,
    image: "/assets/images/branchImages/branch-03.jpg",
    title: "شعبه اقدسیه",
    address: "خیابان اقدسیه ، نرسیده به میدان خیام، پلاک ۸",
    phoneNumber: "۰۲۱-۵۴۸۹۱۲۵۴-۵۵",
    workTime: "همه روزه از ساعت 12 تا 23 بجز روزهای تعطیل",
  },
  {
    id: 4,
    image: "/assets/images/branchImages/branch-04.jpg",
    title: "شعبه ونک",
    address: "میدان ونک، خیابان فردوسی، نبش کوچه نیلوفر، پلاک ۲۶",
    phoneNumber: "۰۲۱-۵۴۸۹۱۲۵۶-۵۷",
    workTime: "همه روزه از ساعت 12 تا 23 بجز روزهای تعطیل",
  },
];

export default function BranchList() {
  return (
    <div className="px-5 py-6 container mx-auto lg:px-10 2xl:px-28">
      <div className="flex flex-col gap-y-7">
        {branchesData.map((item) => (
          <BranchCard data={item} key={item.id} />
        ))}
      </div>
    </div>
  );
}
