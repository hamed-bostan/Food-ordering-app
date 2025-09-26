import { StaticImageData } from "next/image";

export type Branch = {
  id: number;
  image: StaticImageData;
  title: string;
  address: string;
  phoneNumber: string;
  workTime: string;
};

export type BranchContentProps = Omit<Branch, "id" | "image">;

export type DisplayImageProps = Pick<Branch, "image" | "title">;
