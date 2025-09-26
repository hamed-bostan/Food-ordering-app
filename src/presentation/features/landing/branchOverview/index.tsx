import { BranchListProps } from "@/types/landing.types";
import BranchItem from "./BranchItem";
import { branchList } from "@/presentation/constants/landing";

export default function BranchOverview() {
  return (
    <section className="px-5 py-6 lg:px-10 2xl:px-28">
      <h2 className="block text-center mb-3 text-[#353535] md:text-lg font-bold md:mb-5">ترخینه گردی</h2>
      <BranchList branches={branchList} />
    </section>
  );
}

function BranchList({ branches }: BranchListProps) {
  return (
    <ul className="flex flex-col list-none gap-y-3 md:grid md:grid-cols-2 md:gap-5 xl:grid-cols-4">
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
