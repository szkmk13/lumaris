import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { password } = await req.json();
  console.log(process.env.ADMIN_PASSWORD,process.env.NEXT_PUBLIC_ADMIN_PASSWORD)
  if (
    !process.env.ADMIN_PASSWORD ||
    !process.env.ADMIN_COOKIE_SECRET ||
    password !== process.env.ADMIN_PASSWORD
  ) {
    return NextResponse.json({ error: "Nieprawidłowe hasło" }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set("admin_token", process.env.ADMIN_COOKIE_SECRET, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: "/",
  });

  return res;
}

export async function DELETE() {
  const res = NextResponse.json({ ok: true });
  res.cookies.delete("admin_token");
  return res;
}
