import { NextRequest, NextResponse } from "next/server";
// import dotenv from "dotenv";
import dbConnect from "../../lib/dbConnect";
import Order from "../../models/Order";

// dotenv.config();

const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent`;

export async function GET(request: NextRequest) {
  await dbConnect();

  if (!process.env.GEMINI_API_KEY) {
    return NextResponse.json(
      {
        success: false,
        error: "Missing GEMINI_API_KEY in environment variables.",
      },
      { status: 500 }
    );
  }

  try {
    // Fetch past orders
    const orders = await Order.find({}, "-__v -updatedAt").sort({
      orderDate: 1,
    });
    // console.log("orders====>", orders);
    if (orders.length === 0) {
      return NextResponse.json(
        {
          success: false,
          error: "No past sales data available for prediction.",
        },
        { status: 404 }
      );
    }

    // Prepare input data for Gemini API
    const prompt = `
      Given the following sales data, predict the total sales revenue for the next 12 months.
      Return the output in JSON format with estimated monthly sales.

      Sales Data:
      ${JSON.stringify(orders, null, 2)}
    `;

    const response = await fetch(
      `${GEMINI_API_URL}?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
        }),
      }
    );

    // console.log("response======>", response);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Gemini API Error: ${errorText}`);
    }

    const result = await response.json();

    // console.log("result========>", result);

    const rawText = result.candidates[0]?.content?.parts[0]?.text || "";
    // console.log("Raw Gemini Response:", rawText);

    // Extract JSON from potential Markdown formatting
    const cleanedText = rawText.replace(/```json|```/g, "").trim();

    let prediction;
    try {
      prediction = JSON.parse(cleanedText);
    //   console.log("Cleaned Prediction Data:", prediction);
    } catch (parseError) {
    //   console.error("Failed to parse Gemini response:", parseError);
      return NextResponse.json(
        { success: false, error: "Invalid JSON format from Gemini response." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, data: prediction });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}