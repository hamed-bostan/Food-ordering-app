import { Schema, model, models } from "mongoose";

const productSchema = new Schema({
  id: { type: Number, required: true },
  category: { type: String, required: true },
  image: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  discount: { type: Number, default: null },
  score: { type: String, required: true },
  filter: { type: String, default: null },
  mostsale: { type: Boolean, required: true },
});

const Product = models.Product || model("Product", productSchema);
export default Product;
