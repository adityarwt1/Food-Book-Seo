import React from "react";

const MyRecipieSkeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-pulse">
      {[...Array(10)].map((_, index) => (
        <div key={index} className="bg-white rounded-xl overflow-hidden shadow-sm">
          {/* Image skeleton */}
          <div className="h-48 bg-gray-200" />

          <div className="p-6 space-y-4">
            {/* Category + Time */}
            <div className="flex items-center gap-2">
              <div className="h-6 w-24 bg-amber-100 rounded-full" />
              <div className="h-4 w-14 bg-gray-300 rounded" />
            </div>

            {/* Title */}
            <div className="h-6 bg-gray-300 rounded w-3/4" />

            {/* Description */}
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded w-full" />
              <div className="h-4 bg-gray-200 rounded w-5/6" />
            </div>

            {/* Buttons row */}
            <div className="flex justify-between items-center mt-4">
              <div className="h-4 w-24 bg-amber-200 rounded" />
              <div className="flex gap-2">
                <div className="h-8 w-8 bg-blue-100 rounded-full" />
                <div className="h-8 w-8 bg-red-100 rounded-full" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyRecipieSkeleton;
