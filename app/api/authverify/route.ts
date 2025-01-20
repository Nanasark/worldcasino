import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    // Log incoming request
    console.log("[authverify][debug] Incoming request:", req);

    // Parse the request body
    const body = await req.json();
    console.log("[authverify][debug] Parsed body:", body);

    // Extract the payload (user ID)
    const { payload } = body;
    console.log("[authverify][debug] Extracted payload:", payload);

    // Validate the payload
    if (!payload || typeof payload !== "string") {
      console.error("[authverify][error] Invalid or missing payload:", payload);
      return NextResponse.json(
        { error: "Invalid or missing payload" },
        { status: 400 }
      );
    }

    // Example: Simulated verification logic
    const isValidUser = payload.startsWith("0x"); // Example check for Ethereum-like address
    if (!isValidUser) {
      console.error("[authverify][error] Invalid user ID:", payload);
      return NextResponse.json(
        { error: "Invalid user ID" },
        { status: 401 } // Unauthorized
      );
    }

    // Log successful validation
    console.log("[authverify][debug] User ID validated:", payload);

    // Response to thirdweb with userId and expiration time (7 days)
    const response = {
      userId: payload, // Return the same payload as the user ID
      exp: Math.floor(Date.now() / 1000) + 7 * 24 * 60 * 60, // 7-day session expiration
    };
    console.log("[authverify][debug] Returning response:", response);

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    // Log the error
    console.error("[authverify][error] Verification error:", error);

    // Return a generic internal server error
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
