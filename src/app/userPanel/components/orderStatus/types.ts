import { Dispatch, SetStateAction } from "react";

export const filterLists = ["همه", "جاری", "تحویل شده", "لغو شده"] as const; // using 'as const' to infer specific string types
export type FilterCategory = (typeof filterLists)[number]; // FilterCategory now refers to one of the specific strings

export type SetCategoryType = Dispatch<SetStateAction<FilterCategory>>;
