import { QuoteRequestForm } from "@/components/forms/QuoteRequestForm";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Get Your Painting Quote
          </h1>
          <p className="text-lg text-gray-600">
            Fill out the form below and we'll contact you with a free estimate.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8">
          <QuoteRequestForm />
        </div>
      </div>
    </div>
  );
}
