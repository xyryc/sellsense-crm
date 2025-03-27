
import mongoose, { Schema, Document } from "mongoose";

interface IOrder extends Document {
  productId: string; // or Number if productId is a numeric value
  name: string;
  price: number;
  quantity: number;
  totalAmount: number;
  status: string;
}

const OrderSchema: Schema = new Schema(
  {
    productId: {
      type: String, // Or Number if productId is numeric
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
    totalAmount: {
      type: Number,
      required: true,
      min: 0,
    },
    status: {
      type: String,
      required: true,
      enum: ["pending", "completed", "canceled"],
      default: "pending",
    },
  },
  { timestamps: true }
);

// Ensure the model is compiled only once
const Order =
  mongoose.models.Order || mongoose.model<IOrder>("Order", OrderSchema);

export default Order;
