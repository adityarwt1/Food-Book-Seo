// components/RecipeCardSkeleton.tsx
export default function RecipeCardSkeleton() {
    return (
      <div className="bg-white rounded-xl overflow-hidden shadow-sm animate-pulse">
        <div className="h-48 bg-gray-200"></div>
        <div className="p-6">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-20 h-5 bg-gray-300 rounded-full"></div>
            <div className="w-12 h-4 bg-gray-300 rounded"></div>
          </div>
          <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-full mb-1"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6"></div>
        </div>
      </div>
    );
  }
  