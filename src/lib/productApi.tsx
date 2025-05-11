import axios from "axios";

export type ProductType = {
  id: number;
  category: string;
  image: string;
  title: string;
  description: string;
  price: number;
  discount: number | null;
  score: string;
  filter: string | null;
  mostsale: boolean;
};

export const getProducts = async (): Promise<ProductType[]> => {
  const { data } = await axios.get("/api/products");
  return data;
};
