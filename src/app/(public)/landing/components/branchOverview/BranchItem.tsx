import DisplayingImage from "./DisplayingImage";
import DisplayingDetails from "./DisplayingDetails";
import { BranchItemProps } from "@/types/landing.types";

export default function BranchItem({ branch }: BranchItemProps) {
  return (
    <>
      <DisplayingImage branch={branch} />
      <DisplayingDetails branch={branch} />
    </>
  );
}
