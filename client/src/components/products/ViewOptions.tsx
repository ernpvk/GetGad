interface ViewOptionsProps {
  sort: string;
  setSort: (sort: string) => void;
}

export const ViewOptions = ({ sort, setSort }: ViewOptionsProps) => {
  return (
    <div className="flex items-center gap-4">
      <select
        value={sort}
        onChange={(e) => setSort(e.target.value)}
        className="border rounded-lg px-4 py-2"
      >
        <option value="popular">Popular First</option>
        <option value="price-asc">Low to High</option>
        <option value="price-desc">High to Low</option>
        <option value="newest">Newest</option>
      </select>
    </div>
  );
};
