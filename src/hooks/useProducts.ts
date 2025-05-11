// import { useEffect, useState } from "react";
// import axios from "axios";

// export type ProductType = {
//   id: number;
//   category: string;
//   image: string;
//   title: string;
//   description: string;
//   price: number;
//   discount: number | null;
//   score: string;
//   filter: string | null;
//   mostsale: boolean;
// };

// export function useProducts() {
//   const [products, setProducts] = useState<ProductType[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const res = await axios.get("/api/products");
//         setProducts(res.data);
//       } catch (err) {
//         setError("Failed to load products");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProducts();
//   }, []);

//   return { products, loading, error };
// }
