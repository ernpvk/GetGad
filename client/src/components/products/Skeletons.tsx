import React from "react";

const SkeletonBase = ({
  className = "",
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => (
  <div className={`relative overflow-hidden ${className}`}>
    <div className="animate-pulse bg-gray-200 absolute inset-0">
      <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-wave" />
    </div>
    {children}
  </div>
);

export const CategorySkeleton = () => (
  <div className="flex flex-col items-center p-4 border rounded-lg shadow">
    <SkeletonBase className="w-12 h-12 rounded-lg mb-2" />
    <SkeletonBase className="w-16 h-4 rounded" />
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
  <div className="w-full h-full border rounded-lg p-4 bg-white">
    <SkeletonBase className="aspect-square rounded-md mb-4" />
    <div className="space-y-3">
      <SkeletonBase className="h-4 rounded w-3/4" />
      <SkeletonBase className="h-4 rounded w-1/2" />
      <SkeletonBase className="h-3 rounded w-1/4" />
      <div className="flex gap-2">
        <SkeletonBase className="h-4 rounded w-20" />
        <SkeletonBase className="h-4 rounded w-20" />
      </div>
      <SkeletonBase className="h-10 rounded w-full" />
    </div>
  </div>
);

export const ProductsGridSkeleton = () => (
  <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full ">
    {Array.from({ length: 12 }).map((_, index) => (
      <ProductCardSkeleton key={index} />
    ))}
  </div>
);

export const ProductDetailSkeleton = () => (
  <div className="container mx-auto px-4 pt-16 pb-8">
    <div className="grid md:grid-cols-2 gap-8 mt-10">
      <SkeletonBase className="aspect-square rounded-lg" />
      <div className="space-y-6">
        <div className="space-y-4">
          <SkeletonBase className="h-8 rounded w-3/4" />
          <SkeletonBase className="h-4 rounded w-1/2" />
        </div>
        <SkeletonBase className="h-6 rounded w-1/4" />
        <div className="space-y-4">
          <SkeletonBase className="h-4 rounded" />
          <SkeletonBase className="h-4 rounded" />
          <SkeletonBase className="h-4 rounded w-3/4" />
        </div>
        <SkeletonBase className="h-12 rounded" />
      </div>
    </div>
  </div>
);
