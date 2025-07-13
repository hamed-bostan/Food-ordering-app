import { BranchItemProps } from "../../lib/types";
import DisplayingImage from "./DisplayingImage";
import DisplayingDetails from "./DisplayingDetails";

export default function BranchItem({ branch }: BranchItemProps) {
  return (
    <>
      <DisplayingImage branch={branch} />
      <DisplayingDetails branch={branch} />
    </>
  );
}
