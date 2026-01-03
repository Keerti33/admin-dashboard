import mongoose, { Schema, Document } from 'mongoose';

export interface IProduct extends Document {
  name: string;
  price: number;
  category: string;
  imageUrl?: string; 
  createdAt: Date;
}

const ProductSchema: Schema = new Schema({
  name: { 
    type: String, 
    required: [true, 'Please provide a name'], 
    maxlength: [60, 'Name cannot be more than 60 characters'] 
  },
  price: { 
    type: Number, 
    required: [true, 'Please provide a price'] 
  },
  category: { 
    type: String, 
    required: [true, 'Please specify a category'],
    enum: ['Electronics', 'Stationery', 'Kitchen'] 
  },
  
  imageUrl: {
    type: String,
    required: false, 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
});

export default mongoose.models.Product || mongoose.model<IProduct>('Product', ProductSchema);