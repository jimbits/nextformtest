import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const { email, name, message } = await request.json();

    // Validate inputs
    if (!email || !name || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Send email using Resend
    const data = await resend.emails.send({
      from: "imailjim@gmail.com", // Replace with your verified sender email
      to: email,
      subject: `We received your message, ${name}!`,
      html: `
        <h1>Thank you for contacting us!</h1>
        <p>Hi ${name},</p>
        <p>We received your message:</p>
        <p><strong>${message}</strong></p>
        <p>We'll get back to you soon.</p>
      `,
    });

    if (data.error) {
      return NextResponse.json(
        { error: "Failed to send email" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, id: data.data?.id },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
