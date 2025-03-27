import mongoose from "mongoose";

// Define TypeScript interface for Product
export interface IProduct extends mongoose.Document {
  productId: string;
  name: string;
  description: string;
  price: number;
  discount: number;
  stock: number;
  category: string;
  brand: string;
  rating: number;
  reviews: number;
  image: string;
  warranty: string;
  returnPolicy: string;
}

// Create Mongoose Schema
const ProductSchema = new mongoose.Schema<IProduct>(
  {
    productId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: [0, "Price cannot be negative"],
    },
    discount: {
      type: Number,
      default: 0,
      min: [0, "Discount cannot be negative"],
      max: [100, "Discount cannot be more than 100"],
    },
    stock: {
      type: Number,
      required: true,
      min: [0, "Stock cannot be negative"],
    },
    category: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      min: [0, "Rating cannot be negative"],
      max: [5, "Rating cannot be more than 5"],
      default: 0,
    },
    reviews: {
      type: Number,
      default: 0,
    },
    image: {
      type: String,
      required: true,
    },
    warranty: {
      type: String,
      required: true,
    },
    returnPolicy: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// Create or retrieve the model
export default mongoose.models.Product ||
  mongoose.model<IProduct>("Product", ProductSchema);
