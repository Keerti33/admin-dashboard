import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Product from '@/models/Product';

// 1. GET: Fetch all products
export async function GET() {
  await connectDB(); // Connect to Mongo
  const products = await Product.find({}); // Find everything
  return NextResponse.json(products); // Send back as JSON
}

// 2. POST: Add a new product
export async function POST(request: Request) {
  await connectDB();
  const data = await request.json(); // Read the data sent from Frontend

  // Create new product in database
  const product = await Product.create(data);
  
  return NextResponse.json({ success: true, data: product }, { status: 201 });
}