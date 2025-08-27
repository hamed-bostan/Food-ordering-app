import { StaticImageData } from "next/image";

export type PrivilegeDetailsProp = {
  id: number;
  text: string;
};

export type HighlightDetailsProp = PrivilegeDetailsProp & {
  image: StaticImageData;
};
