import { NextRequest, NextResponse } from "next/server";
import dbConnect from "../../lib/dbConnect";
import Orders from "../../models/Orders";

// CREATE - POST /api/orders
export async function POST(request: NextRequest) {
  await dbConnect();
  try {
    const body = await request.json();
    const order = await Orders.create(body);
    return NextResponse.json({ success: true, data: order }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}

// READ ALL - GET /api/orders
export async function GET() {
  await dbConnect();
  try {
    const orders = await Orders.find({});
    return NextResponse.json(
      { success: true, count: orders.length, data: orders },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}
