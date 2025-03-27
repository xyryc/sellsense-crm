import mongoose from "mongoose";

// Define TypeScript interface for Order
export interface IOrder extends mongoose.Document {
  productId: mongoose.Types.ObjectId;
  productName: string;
  productPrice: number;
  productQuantity: number;
  totalAmount: number;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  orderDate: Date;
  orderCompleteDate: Date;
}

// Create Mongoose Schema
const OrderSchema = new mongoose.Schema<IOrder>(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Product", // Assuming you have a Product model
    },
    productName: {
      type: String,
      required: true,
      trim: true,
    },
    productPrice: {
      type: Number,
      required: true,
      min: [0, "Price cannot be negative"],
    },
    productQuantity: {
      type: Number,
      required: true,
      min: [1, "Quantity must be at least 1"],
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "processing", "shipped", "delivered", "cancelled"],
      default: "pending",
    },
    orderDate: {
      type: Date,
      default: Date.now,
    },
    orderCompleteDate: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true } // Adds createdAt and updatedAt automatically
);

// Create or retrieve the model
export default mongoose.models.Order ||
  mongoose.model<IOrder>("Order", OrderSchema);
