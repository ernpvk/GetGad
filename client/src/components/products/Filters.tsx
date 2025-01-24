import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

interface FiltersProps {
  selectedCategories: string[];
  setSelectedCategories: (categories: string[]) => void;
  priceRange: number[];
  setPriceRange: (range: number[]) => void;
}

const categories = [
  { id: "tv", label: "TV" },
  { id: "audio", label: "Audio" },
  { id: "laptop", label: "Laptop" },
  { id: "mobile", label: "Mobile" },
  { id: "gaming", label: "Gaming" },
  { id: "appliances", label: "Appliances" },
];

const Filters = ({
  selectedCategories,
  setSelectedCategories,
  priceRange,
  setPriceRange,
}: FiltersProps) => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const categoriesParam = searchParams.get("categories");

    if (categoriesParam) {
      const urlCategories = categoriesParam
        .split(",")
        .map((cat) => cat.toLowerCase())
        .filter((cat) => categories.some((c) => c.id === cat));

      if (urlCategories.length > 0) {
        setSelectedCategories(urlCategories);
      }
    }
  }, [location.search, setSelectedCategories]);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);

    if (selectedCategories.length > 0) {
      searchParams.set("categories", selectedCategories.join(","));
    } else {
      searchParams.delete("categories");
    }

    navigate(`${location.pathname}?${searchParams.toString()}`, {
      replace: true,
    });
  }, [selectedCategories, location.pathname, navigate, location.search]);

  const handleCategoryChange = (categoryId: string) => {
    const newSelectedCategories = selectedCategories.includes(categoryId)
      ? selectedCategories.filter((id) => id !== categoryId)
      : [...selectedCategories, categoryId];

    setSelectedCategories(newSelectedCategories);
  };

  return (
    <div className="space-y-6 sticky top-24">
      <div>
        <h3 className="text-lg font-medium mb-4">Category</h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <label
              key={category.id}
              className="flex items-center gap-2 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={selectedCategories.includes(category.id)}
                onChange={() => handleCategoryChange(category.id)}
                className="rounded border-gray-300 focus:ring-blue-500 cursor-pointer"
              />
              <span className="cursor-pointer">{category.label}</span>
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
            max="6000"
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
