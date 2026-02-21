import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, default: "", trim: true },
    price: { type: Number, required: true, min: 0 },
    category: { type: String, required: true, trim: true, lowercase: true },
    images: { type: [String], default: [] },
    stock: { type: Number, default: 0, min: 0 },
    rating: { type: Number, default: 0, min: 0, max: 5 }
  },
  { timestamps: true }
);

productSchema.set("toJSON", {
  transform: (_, ret) => {
    ret.id = ret._id.toString();
    ret.createdAt = ret.createdAt || ret.updatedAt;
    delete ret._id;
    delete ret.__v;
    return ret;
  }
});

const Product = mongoose.model("Product", productSchema);

export default Product;
