export default function LoadingSkeleton() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((_, index) => (
                <div
                    key={index}
                    className="bg-white rounded-xl overflow-hidden shadow-sm animate-pulse"
                >
                    {/* Image skeleton */}
                    <div className="h-48 bg-gray-200" />

                    {/* Text content skeleton */}
                    <div className="p-6 space-y-3">
                        <div className="flex items-center gap-2 mb-2">
                            <div className="h-6 w-20 bg-amber-100 rounded-full" />
                            <div className="h-4 w-12 bg-gray-300 rounded" />
                        </div>
                        <div className="h-6 bg-gray-300 rounded w-3/4" />
                        <div className="space-y-2">
                            <div className="h-4 bg-gray-200 rounded w-full" />
                            <div className="h-4 bg-gray-200 rounded w-5/6" />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
