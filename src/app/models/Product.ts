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
