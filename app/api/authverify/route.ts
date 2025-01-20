import { NextResponse } from "next/server";

// Simulated function to validate the payload (replace with actual logic)
const validatePayload = (payload: string) => {
  // Example validation logic
  if (!payload || payload === "anonymous") {
    return null;
  }

  // Simulated user data (replace with actual database or other logic)
  return {
    userId: payload,
    email: `${payload}@example.com`, // Optional email
    exp: Math.floor(Date.now() / 1000) + 7 * 24 * 60 * 60, // 7-day session expiration
  };
};

// Define the POST handler
export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { payload } = body;

    if (!payload) {
      return NextResponse.json({ error: "Missing payload" }, { status: 400 });
    }

    const user = validatePayload(payload);

    if (!user) {
      return NextResponse.json({ error: "Invalid payload" }, { status: 401 });
    }

    // Respond with the user details required by thirdweb
    return NextResponse.json({
      userId: user.userId,
      email: user.email, // Optional
      exp: user.exp, // Optional
    });
  } catch (error) {
    console.error("Error validating payload:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
