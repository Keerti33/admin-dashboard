import mongoose, { Schema, Document } from 'mongoose';

// 1. Define the TypeScript Interface (for your code to understand)
export interface IProduct extends Document {
  name: string;
  price: number;
  category: string;
  createdAt: Date;
}

// 2. Define the MongoDB Schema (for the database to understand)
const ProductSchema: Schema = new Schema({
  name: { 
    type: String, 
    required: [true, 'Please provide a name for this product.'], 
    maxlength: [60, 'Name cannot be more than 60 characters'] 
  },
  price: { 
    type: Number, 
    required: [true, 'Please provide a price for this product.'] 
  },
  category: { 
    type: String, 
    required: [true, 'Please specify a category.'],
    enum: ['Electronics', 'Stationery', 'Kitchen'] // Only allows these 3 for now
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
});

// 3. Check if the model already exists (to prevent errors in Next.js hot-reloading)
export default mongoose.models.Product || mongoose.model<IProduct>('Product', ProductSchema);