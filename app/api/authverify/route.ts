import { type NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { payload } = body;

  // Here you would typically verify the payload against your session or database
  // For this example, we're just checking if it matches the user ID
  if (payload !== session.user.id) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  return NextResponse.json({
    userId: session.user.id,
    email: session.user.email,
    exp: Math.floor(Date.now() / 1000) + 7 * 24 * 60 * 60, // 7 days from now
  });
}
