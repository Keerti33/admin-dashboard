import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Product from '@/models/Product';

// 1. DELETE: Remove a specific product
export async function DELETE(
  request: Request,
  // FIX: Type 'params' as a Promise
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    
    // FIX: Await the params to get the ID
    const { id } = await params;

    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return NextResponse.json(
        { message: 'Product not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: 'Product deleted successfully' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Error deleting product', error }, { status: 500 });
  }
}

// 2. PUT: Update a specific product
export async function PUT(
  request: Request,
  // FIX: Type 'params' as a Promise
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    
    // FIX: Await the params here too
    const { id } = await params;
    
    const body = await request.json(); 

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { ...body },
      { new: true } 
    );

    if (!updatedProduct) {
      return NextResponse.json(
        { message: 'Product not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: 'Product updated', data: updatedProduct }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Error updating product', error }, { status: 500 });
  }
}