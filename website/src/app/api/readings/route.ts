import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(req: NextRequest) {
  const email = req.nextUrl.searchParams.get("email");

  if (!email) {
    return NextResponse.json({ error: "Email required" }, { status: 400 });
  }

  const user = await db.user.findUnique({
    where: { email },
    include: {
      readings: {
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          tier: true,
          status: true,
          birthName: true,
          birthDate: true,
          content: true,
          createdAt: true,
        },
      },
      subscription: true,
    },
  });

  if (!user) {
    return NextResponse.json({ readings: [], subscription: null });
  }

  return NextResponse.json({
    readings: user.readings,
    subscription: user.subscription,
  });
}
