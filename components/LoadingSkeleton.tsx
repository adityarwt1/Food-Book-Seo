export default function LoadingSkeleton() {
    return (
      <div className="animate-pulse bg-white rounded-lg shadow">
        <div className="h-48 bg-gray-200 relative overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-full h-full bg-gray-300" />
          </div>
        </div>
        <div className="p-6">
          <div className="flex items-center gap-2 mb-2">
            <div className="h-6 w-20 bg-amber-100 rounded-full" />
            <div className="h-4 w-12 bg-gray-300 rounded" />
          </div>
          <div className="h-6 bg-gray-300 rounded w-3/4 mb-2" />
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded w-full" />
            <div className="h-4 bg-gray-200 rounded w-5/6" />
          </div>
        </div>
      </div>
    );
  }
  