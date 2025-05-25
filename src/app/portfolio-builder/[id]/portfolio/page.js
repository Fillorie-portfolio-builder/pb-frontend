import Link from "next/link";

export default function PortfolioPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white px-6 py-8">
      {/* Back to Portfolio Link */}

      {/* Main Project Container */}
      <div className="bg-white shadow-md rounded-lg p-6 max-w-7xl mx-auto">
        <Link
          href="/portfolio"
          className="text-[#3C65F5] text-sm mb-4 inline-block"
        >
          &larr; Back to Portfolio
        </Link>
        {/* Project Title */}
        <h1 className="text-2xl font-bold text-purple-700 mb-4">
          E-commerce UX Redesign
        </h1>

        {/* Grid Layout */}
        <div className="grid md:grid-cols-3 gap-4">
          {/* Main Image */}
          <div className="md:col-span-2 bg-gray-200 rounded-lg h-106 flex items-center justify-center">
            <span className="text-gray-400">Image</span>
          </div>

          {/* Gallery */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-200 rounded-lg h-56 flex items-center justify-center">
              <span className="text-gray-400">+</span>
            </div>
            <div className="bg-gray-200 rounded-lg h-56 flex items-center justify-center">
              <span className="text-gray-400">+</span>
            </div>
            <div className="bg-gray-200 rounded-lg h-56 flex items-center justify-center col-span-2">
              <span className="text-gray-400">+</span>
            </div>
          </div>
        </div>

        {/* Project Details */}
        <div className="mt-6 grid md:grid-cols-2 gap-6">
          {/* Left Column */}
          <div>
            <h2 className="font-semibold text-lg">Project Overview</h2>
            <p className="text-gray-600 mt-1">
              A comprehensive redesign of an e-commerce platform's user
              experience, focusing on streamlining the checkout process to
              improve conversion rates.
            </p>

            <h2 className="font-semibold text-lg mt-4">My Contribution</h2>
            <p className="text-gray-600 mt-1">
              Led the redesign of the checkout process, resulting in a 15%
              increase in conversion rate.
            </p>

            <h2 className="font-semibold text-lg mt-4">Project Links</h2>
            <Link
              href="https://example.com"
              className="text-[#3C65F5] underline mt-1 block"
            >
              example.com
            </Link>
          </div>

          {/* Right Column */}
          <div>
            <h2 className="font-semibold text-lg">Project Videos</h2>
            <div className="bg-gray-100 rounded-lg p-4 mt-2">
              <h3 className="text-lg font-bold">Example Domain</h3>
              <p className="text-gray-600 text-sm mt-1">
                This domain is for use in illustrative examples in documents.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
