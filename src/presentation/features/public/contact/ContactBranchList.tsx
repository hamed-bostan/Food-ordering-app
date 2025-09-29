import { contactBranchesData } from "@/presentation/constants/contact";
import BranchCard from "./branchCard";

export default function ContactBranchList() {
  return (
    <div className="container px-5 py-6 mx-auto lg:px-10 2xl:px-28">
      <ul className="flex flex-col gap-y-7">
        {contactBranchesData.map((item) => (
          <li key={item.id}>
            <BranchCard {...item} />
          </li>
        ))}
      </ul>
    </div>
  );
}
