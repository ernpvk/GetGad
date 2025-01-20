// src/components/products/Filters.tsx
import { useState } from "react";

const categories = [
  { id: "TV", label: "TV" },
  { id: "audio", label: "Audio" },
  { id: "laptop", label: "Laptop" },
  { id: "mobile", label: "Mobile" },
  { id: "Gaming", label: "Gaming" },
  { id: "Appliance", label: "Appliances" },
];

const colors = [
  { id: "white", label: "White" },
  { id: "black", label: "Black" },
  { id: "blue", label: "Blue" },
  { id: "silver", label: "Silver" },
];

const Filters = () => {
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);

  return (
    <div className="space-y-6">
      {/* Categories */}
      <div>
        <h3 className="text-lg font-medium mb-4">Category</h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <label key={category.id} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={selectedCategories.includes(category.id)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedCategories([...selectedCategories, category.id]);
                  } else {
                    setSelectedCategories(
                      selectedCategories.filter((id) => id !== category.id)
                    );
                  }
                }}
                className="rounded border-gray-300 focus:ring-blue-500"
              />
              <span>{category.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Colors */}
      <div>
        <h3 className="text-lg font-medium mb-4">Color</h3>
        <div className="space-y-2">
          {colors.map((color) => (
            <label key={color.id} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={selectedColors.includes(color.id)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedColors([...selectedColors, color.id]);
                  } else {
                    setSelectedColors(
                      selectedColors.filter((id) => id !== color.id)
                    );
                  }
                }}
                className="rounded border-gray-300 focus:ring-blue-500"
              />
              <span>{color.label}</span>
            </label>
          ))}
        </div>
      </div>
      {/* Price Range */}
      <div>
        <h3 className="text-lg font-medium mb-4">Price Range</h3>
        <div className="space-y-4">
          <input
            type="range"
            min="0"
            max="1000"
            value={priceRange[1]}
            onChange={(e) =>
              setPriceRange([priceRange[0], parseInt(e.target.value)])
            }
            className="w-full"
          />
          <div className="flex gap-4">
            <input
              type="number"
              value={priceRange[0]}
              onChange={(e) =>
                setPriceRange([parseInt(e.target.value), priceRange[1]])
              }
              className="w-24 border rounded px-2 py-1"
              placeholder="Min"
            />
            <input
              type="number"
              value={priceRange[1]}
              onChange={(e) =>
                setPriceRange([priceRange[0], parseInt(e.target.value)])
              }
              className="w-24 border rounded px-2 py-1"
              placeholder="Max"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filters;
