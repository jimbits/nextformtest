"use server";

import { Resend } from "resend";
import {
  quoteRequestSchema,
  type QuoteRequest,
} from "@/lib/validation/contact";

const resend = new Resend(process.env.RESEND_API_KEY);
const COMPANY_EMAIL = "imailjim@gmail.com";

export async function submitQuoteRequest(formData: QuoteRequest) {
  try {
    // Validate the form data
    const validatedData = quoteRequestSchema.parse(formData);

    // Send email to company
    await resend.emails.send({
      from: "Quote Request <onboarding@resend.dev>",
      to: COMPANY_EMAIL,
      subject: `New Quote Request from ${validatedData.name}`,
      html: `
        <h2>New Quote Request</h2>
        <p><strong>Name:</strong> ${validatedData.name}</p>
        <p><strong>Email:</strong> ${validatedData.email}</p>
        <p><strong>Phone:</strong> ${validatedData.phone}</p>
        <p><strong>Painting Type:</strong> ${validatedData.paintingType}</p>
      `,
    });

    // Send confirmation email to client
    await resend.emails.send({
      from: "Painting Company <onboarding@resend.dev>",
      to: validatedData.email,
      subject: "We received your quote request",
      html: `
        <h2>Thank you for your quote request!</h2>
        <p>Hi ${validatedData.name},</p>
        <p>We've received your request for a ${validatedData.paintingType} painting quote. We'll contact you shortly at ${validatedData.phone}.</p>
        <p>Best regards,<br>Painting Company</p>
      `,
    });

    return { success: true, message: "Quote request submitted successfully!" };
  } catch (error) {
    console.error("Error submitting quote request:", error);
    return {
      success: false,
      message: "Failed to submit quote request. Please try again.",
    };
  }
}
