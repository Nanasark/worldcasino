import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    // Parse the request body
    const body = await req.json();

    // Extract the payload (user ID)
    const { payload } = body;

    // Validate the payload
    if (!payload || typeof payload !== "string") {
      return NextResponse.json(
        { error: "Invalid or missing payload" },
        { status: 400 }
      );
    }

    // Example: Simulated verification logic
    // Replace this with your actual verification logic if needed
    const isValidUser = payload.startsWith("0x"); // Example check for Ethereum-like address
    if (!isValidUser) {
      return NextResponse.json(
        { error: "Invalid user ID" },
        { status: 401 } // Unauthorized
      );
    }

    // Response to thirdweb
    return NextResponse.json(
      {
        userId: payload, // Return the same payload as the user ID
        exp: Math.floor(Date.now() / 1000) + 7 * 24 * 60 * 60, // 7-day session expiration
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Verification error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
