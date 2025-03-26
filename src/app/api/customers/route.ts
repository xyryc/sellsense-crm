import { NextRequest, NextResponse } from "next/server";
import dbConnect from "../../lib/dbConnect";
import Customer from "../../models/Customer";

// CREATE a new customer - POST /api/customers
export async function POST(request: NextRequest) {
  await dbConnect();

  try {
    const body = await request.json();
    const customer = await Customer.create(body);

    return NextResponse.json(
      { success: true, data: customer },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}

// READ all customers - GET /api/customers
export async function GET() {
  await dbConnect();

  try {
    const customers = await Customer.find({});
    return NextResponse.json({
      success: true,
      count: customers.length,
      data: customers,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}