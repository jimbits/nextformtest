import { z } from "zod";

export const quoteRequestSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  phone: z
    .string()
    .regex(/^\d{10}$/, "Phone must be 10 digits (no formatting needed)"),
  paintingType: z
    .enum(["interior", "exterior"])
    .refine((val) => val !== undefined, {
      message: "Please select a painting type",
    }),
});

export type QuoteRequest = z.infer<typeof quoteRequestSchema>;
