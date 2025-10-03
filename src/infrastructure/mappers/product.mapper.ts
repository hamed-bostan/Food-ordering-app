import { ProductType } from "@/application/schemas/product.schema";

/**
 * Map MongoDB document to ProductType
 */
export function mapDbProductToDomain(doc: any): ProductType {
  return {
    id: doc._id.toString(),
    category: doc.category,
    image: doc.image,
    title: doc.title,
    description: doc.description,
    price: doc.price,
    discount: doc.discount,
    score: doc.score,
    filter: doc.filter ?? undefined,
    mostsale: doc.mostsale,
    createdAt: new Date(doc.createdAt), // convert to Date and include
  };
}
