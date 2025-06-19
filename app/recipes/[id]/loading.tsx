import React from "react";

function Loading() {
  return (
    <div className="min-h-screen bg-white py-12 px-4 h-screen">
      <div className="max-w-4xl mx-auto animate-pulse">
        {/* Placeholder for back button or top information */}
        <div className="inline-flex items-center text-gray-300 mb-6 space-x-2">
          <div className="w-5 h-5 bg-gray-300 rounded-full"></div>
          <div className="w-32 h-4 bg-gray-300 rounded"></div>
        </div>

        {/* Recipe Header */}
        <div className="mb-8">
          <div className="h-10 bg-gray-300 rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-gray-300 rounded w-full mb-6"></div>

          {/* Recipe Info */}
          <div className="flex flex-wrap gap-4 mb-6">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-gray-300 rounded-full"></div>
              <div className="w-20 h-4 bg-gray-300 rounded"></div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-gray-300 rounded-full"></div>
              <div className="w-24 h-4 bg-gray-300 rounded"></div>
            </div>
            <div className="px-3 py-1 bg-gray-300 rounded-full w-24 h-6"></div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <div className="h-10 bg-gray-300 rounded w-32"></div>
            <div className="h-10 bg-gray-300 rounded w-24"></div>
            <div className="h-10 bg-gray-300 rounded w-24"></div>
          </div>
        </div>

        {/* Placeholder for Recipe Image */}
        <div className="h-80 bg-gray-300 rounded-xl mb-8"></div>

        {/* Ingredients and Instructions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {/* Ingredients Section */}
          <div className="md:col-span-1">
            <div className="h-6 bg-gray-300 rounded w-32 mb-4"></div>
            <ul className="space-y-3">
              {Array.from({ length: 5 }).map((_, index) => (
                <li key={index} className="flex items-start gap-2">
                  <div className="w-5 h-5 rounded-full bg-gray-300 mt-1"></div>
                  <div className="w-40 h-4 bg-gray-300 rounded"></div>
                </li>
              ))}
            </ul>
          </div>

          {/* Instructions Section */}
          <div className="md:col-span-2">
            <div className="h-6 bg-gray-300 rounded w-32 mb-4"></div>
            <ol className="space-y-6">
              {Array.from({ length: 4 }).map((_, index) => (
                <li key={index} className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-gray-300"></div>
                  <div className="w-full space-y-2">
                    <div className="h-4 bg-gray-300 rounded w-full"></div>
                    <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Loading;
