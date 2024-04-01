import { NextResponse } from "next/server";
import { getAppSessionServer } from "@/kernel/lib/next-auth/server";

export const GET = async () => {
  try {
    const session = await getAppSessionServer();
    return NextResponse.json(session, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: "GET Error", err }, { status: 500 });
  }
};
