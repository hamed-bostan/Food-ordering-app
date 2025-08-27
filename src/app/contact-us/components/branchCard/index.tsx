import { BranchesProp } from "../../lib/types";
import ActionButtons from "./ActionButtons";
import BranchContent from "./BranchContent";
import DisplayImage from "./DisplayImage";

export default function BranchCard({
  title,
  image,
  address,
  phoneNumber,
  workTime,
}: BranchesProp) {
  return (
    <article className="border border-[#CBCBCB] rounded-sm overflow-hidden md:grid md:grid-cols-2 md:h-52 group md:rounded-lg md:hover:shadow-md">
      <DisplayImage image={image} title={title} />
      <div className="text-[#717171] text-xs text-center p-4 pt-2 md:px-3 md:text-sm md:flex md:flex-col md:justify-center md:py-0">
        <BranchContent
          address={address}
          phoneNumber={phoneNumber}
          title={title}
          workTime={workTime}
        />
        <ActionButtons />
      </div>
    </article>
  );
}
