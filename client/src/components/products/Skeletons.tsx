export const HeroSkeleton = () => (
  <div className="bg-gradient-to-r from-pink-50 to-blue-50 rounded-2xl p-8 md:p-12 animate-pulse">
    <div className="flex flex-col md:flex-row items-center gap-8">
      <div className="flex-1 space-y-4">
        <div className="w-32 h-6 bg-gray-200 rounded-full" />
        <div className="space-y-2">
          <div className="h-10 bg-gray-200 rounded w-3/4" />
          <div className="h-10 bg-gray-200 rounded w-1/2" />
        </div>
        <div className="h-8 bg-gray-200 rounded w-24" />
        <div className="h-12 bg-gray-200 rounded w-40" />
      </div>
      <div className="flex-1">
        <div className="aspect-square bg-gray-200 rounded-lg" />
      </div>
    </div>
  </div>
);

export const CategorySkeleton = () => (
  <div className="flex flex-col items-center p-4 border rounded-lg shadow">
    <div className="w-12 h-12 bg-gray-200 rounded-lg mb-2" />
    <div className="w-16 h-4 bg-gray-200 rounded" />
  </div>
);

export const CategoriesSkeleton = () => (
  <div className="grid grid-cols-3 md:grid-cols-7 gap-4">
    {Array.from({ length: 7 }).map((_, index) => (
      <CategorySkeleton key={index} />
    ))}
  </div>
);

export const ProductCardSkeleton = () => (
  <div className="border rounded-lg p-4">
    <div className="aspect-square mb-4 bg-gray-200 rounded-md" />
    <div className="space-y-3">
      <div className="h-4 bg-gray-200 rounded w-3/4" />
      <div className="h-4 bg-gray-200 rounded w-1/2" />
      <div className="h-3 bg-gray-200 rounded w-1/4" />
      <div className="flex gap-2">
        <div className="h-4 bg-gray-200 rounded w-20" />
        <div className="h-4 bg-gray-200 rounded w-20" />
      </div>
      <div className="h-10 bg-gray-200 rounded w-full" />
    </div>
  </div>
);
