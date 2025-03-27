<<<<<<< HEAD
import mongoose, { Schema, Document, model } from "mongoose";
// Define TypeScript interface
export interface IProduct extends Document {
  id: string;
  name: string;
  description: string;
  price: number;
  discount: number;
  stock: number;
  category: string;
  brand: string;
  rating: number;
  reviews: number;
  warranty: string;
  return_policy: string;
}
// Define Mongoose schema with validation
const ProductSchema = new Schema<IProduct>(
  {
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true, trim: true, minlength: 3 },
    description: { type: String, required: true, minlength: 10 },
    price: { type: Number, required: true, min: 0 },
    discount: { type: Number, required: true, min: 0, max: 100 },
    stock: { type: Number, required: true, min: 0 },
    category: { type: String, required: true, trim: true },
    brand: { type: String, required: true, trim: true },
    rating: { type: Number, required: true, min: 0, max: 5 },
    reviews: { type: Number, required: true, min: 0 },
    warranty: { type: String, required: true },
    return_policy: { type: String, required: true },
  },
  { timestamps: true }
);
export default mongoose.models.Product ||
  model<IProduct>("Product", ProductSchema);
=======
import mongoose, { Schema, Document } from 'mongoose';

export interface IProduct extends Document {
  name: string;
  sku: string;
  stock: number;
  restockThreshold: number;
  supplierId: mongoose.Types.ObjectId;
  createdAt?: Date;
}

const ProductSchema = new Schema<IProduct>({
  name: { type: String, required: true, trim: true },
  sku: { type: String, required: true, unique: true },
  stock: { type: Number, required: true, min: 0 },
  restockThreshold: { type: Number, required: true, min: 1 },
  supplierId: { type: Schema.Types.ObjectId, ref: 'Supplier', required: true },
  createdAt: { type: Date, default: Date.now },
});

// Virtual field to calculate stock status
ProductSchema.virtual('stockStatus').get(function () {
  if (this.stock === 0) return 'Out of Stock';
  if (this.stock < this.restockThreshold) return 'Low Stock';
  return 'In Stock';
});

export default mongoose.models.Product || mongoose.model<IProduct>('Product', ProductSchema);
>>>>>>> 4d7a8a50ff31563dfb56c7df6d5967afa3f4c5b5
