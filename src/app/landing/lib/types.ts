import { SvgIconComponent } from "@mui/icons-material";
import { StaticImageData } from "next/image";

export type CardItem = {
  id: number;
  icon: SvgIconComponent;
  text: string;
};

export type CardSectionProps = {
  data: CardItem[];
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
