import axios from "axios";

export type Product = {
  category: string;
  description: string;
  discount: number | null;
  filter: string | null;
  id: number;
  image: string; // URL or path to the product image
  mostsale: boolean; // A flag indicating if it's the most sold item
  price: number;
  score: string;
  title: string;
};

export const fetchProducts = async (): Promise<Product[]> => {
  try {
    const response = await axios.get<Product[]>("/api/products");
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error; // Rethrow error so it can be handled in the component if needed
  }
};
