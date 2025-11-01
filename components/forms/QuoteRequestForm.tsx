"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  quoteRequestSchema,
  type QuoteRequest,
} from "@/lib/validation/contact";
import { submitQuoteRequest } from "@/lib/actions/contact";
import clsx from "clsx";

export function QuoteRequestForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<QuoteRequest>({
    resolver: zodResolver(quoteRequestSchema),
  });

  const onSubmit = async (data: QuoteRequest) => {
    setIsSubmitting(true);
    setSubmitMessage(null);

    const result = await submitQuoteRequest(data);

    if (result.success) {
      setSubmitMessage({ type: "success", text: result.message });
      reset();
    } else {
      setSubmitMessage({ type: "error", text: result.message });
    }

    setIsSubmitting(false);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-md mx-auto space-y-6"
    >
      {/* Name Field */}
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700"
        >
          Name
        </label>
        <input
          id="name"
          type="text"
          placeholder="Your full name"
          {...register("name")}
          className={clsx(
            "mt-1 w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500",
            errors.name ? "border-red-500" : "border-gray-300"
          )}
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
        )}
      </div>

      {/* Email Field */}
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          Email
        </label>
        <input
          id="email"
          type="email"
          placeholder="your@email.com"
          {...register("email")}
          className={clsx(
            "mt-1 w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500",
            errors.email ? "border-red-500" : "border-gray-300"
          )}
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
        )}
      </div>

      {/* Phone Field */}
      <div>
        <label
          htmlFor="phone"
          className="block text-sm font-medium text-gray-700"
        >
          Phone Number
        </label>
        <input
          id="phone"
          type="tel"
          placeholder="5551234567"
          {...register("phone")}
          className={clsx(
            "mt-1 w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500",
            errors.phone ? "border-red-500" : "border-gray-300"
          )}
        />
        {errors.phone && (
          <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
        )}
      </div>

      {/* Painting Type Field */}
      <div>
        <label
          htmlFor="paintingType"
          className="block text-sm font-medium text-gray-700"
        >
          Painting Type
        </label>
        <select
          id="paintingType"
          {...register("paintingType")}
          className={clsx(
            "mt-1 w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500",
            errors.paintingType ? "border-red-500" : "border-gray-300"
          )}
        >
          <option value="">Select a type</option>
          <option value="interior">Interior</option>
          <option value="exterior">Exterior</option>
        </select>
        {errors.paintingType && (
          <p className="mt-1 text-sm text-red-600">
            {errors.paintingType.message}
          </p>
        )}
      </div>

      {/* Submit Message */}
      {submitMessage && (
        <div
          className={clsx(
            "p-3 rounded-md text-sm",
            submitMessage.type === "success"
              ? "bg-green-50 text-green-800 border border-green-200"
              : "bg-red-50 text-red-800 border border-red-200"
          )}
        >
          {submitMessage.text}
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className={clsx(
          "w-full px-4 py-2 font-medium text-white rounded-md transition-colors",
          isSubmitting
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700"
        )}
      >
        {isSubmitting ? "Submitting..." : "Request a Quote"}
      </button>
    </form>
  );
}
