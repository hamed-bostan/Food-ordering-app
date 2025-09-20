import { SvgIconComponent } from "@mui/icons-material";
import { StaticImageData } from "next/image";

export type CardItemProps = {
  id: number;
  icon: SvgIconComponent;
  text: string;
};

export type CardSectionProps = {
  data: CardItemProps[];
};

export type BranchProps = {
  id: number;
  image: StaticImageData;
  title: string;
  address: string;
  phoneNumber: string;
  workTime: string;
};

export type BranchListProps = {
  branches: BranchProps[];
};

export type BranchItemProps = {
  branch: BranchProps;
};
