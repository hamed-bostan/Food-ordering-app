import BranchItem from "./BranchItem";

export type Branch = {
  id: number;
  image: string;
  title: string;
  address: string;
  phoneNumber: string;
  workTime: string;
};

const branchList: Branch[] = [
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
    address: "چالوس، خیابان ۱۷ شهریور، بعد کوچه کوروش ",
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
    <div className="flex flex-col gap-y-3 md:grid md:grid-cols-2 md:gap-5 xl:grid-cols-4">
      {branches.map((branch) => (
        <BranchItem branch={branch} key={branch.id} />
      ))}
    </div>
  );
}
