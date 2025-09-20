import { StaticImageData } from "next/image";

export type BranchesProp = {
  id: number;
  image: StaticImageData;
  title: string;
  address: string;
  phoneNumber: string;
  workTime: string;
};

export type BranchContentProps = Omit<BranchesProp, "id" | "image">;

export type DisplayImageProps = Pick<BranchesProp, "image" | "title">;
