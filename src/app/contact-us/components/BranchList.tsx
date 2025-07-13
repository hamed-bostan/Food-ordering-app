import { branches } from "../lib/branch-list";
import BranchCard from "./BranchCard";

export default function BranchList() {
  return (
    <div className="container px-5 py-6 mx-auto lg:px-10 2xl:px-28">
      <ul className="flex flex-col gap-y-7">
        {branches.map((item) => (
          <li key={item.id}>
            <BranchCard branchItem={item} />
          </li>
        ))}
      </ul>
    </div>
  );
}
