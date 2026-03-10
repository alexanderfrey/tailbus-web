import { NextResponse } from "next/server";
import { addToWaitlist } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    const isNew = await addToWaitlist(email.trim().toLowerCase());

    // Optional webhook notification for new signups
    const webhookUrl = process.env.WAITLIST_WEBHOOK_URL;
    if (webhookUrl && isNew) {
      await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: `New waitlist signup: ${email}`,
          text: `New waitlist signup: ${email}`,
        }),
      }).catch(() => {});
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[waitlist]", err);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
