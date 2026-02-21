import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema(
  {
    productId: { type: String, required: true },
    title: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    quantity: { type: Number, required: true, min: 1 }
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema(
  {
    orderId: { type: String, required: true, unique: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    items: { type: [orderItemSchema], default: [] },
    itemsCount: { type: Number, required: true, min: 1 },
    subtotal: { type: Number, required: true, min: 0 },
    shippingAddress: { type: String, required: true, trim: true },
    paymentMethod: { type: String, enum: ["card", "upi", "cod"], required: true },
    status: { type: String, enum: ["pending", "processing", "completed"], default: "pending" }
  },
  { timestamps: true }
);

orderSchema.set("toJSON", {
  transform: (_, ret) => {
    ret.id = ret._id.toString();
    ret.createdAt = ret.createdAt || ret.updatedAt;
    delete ret._id;
    delete ret.__v;
    return ret;
  }
});

const Order = mongoose.model("Order", orderSchema);

export default Order;
