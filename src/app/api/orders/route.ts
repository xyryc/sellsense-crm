import { NextRequest, NextResponse } from "next/server";
import dbConnect from "../../lib/dbConnect"; // Path to your dbConnect function
import Order from "../../models/Order"; // Path to your Order model

// CREATE - POST /api/orders
export async function POST(request: NextRequest) {
  await dbConnect();

  try {
    const body = await request.json();

    // Destructuring and basic validation
    const { productId, name, price, quantity, totalAmount, status } = body;

    if (!productId || !name || !price || !quantity || !totalAmount || !status) {
      throw new Error('All fields are required');
    }

    const order = await Order.create({
      productId,
      name,
      price,
      quantity,
      totalAmount,
      status,
    });

    return NextResponse.json({
      success: true,
      data: order
    }, { status: 201 });

  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error.message
    }, { status: 400 });
  }
}