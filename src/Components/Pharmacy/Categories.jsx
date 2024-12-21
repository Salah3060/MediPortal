import CategoryCard from "./Cards/CategoryCard";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllCategories } from "@/Store/Slices/productsSlice";
import { useEffect } from "react";
import Loader from "../Loader";

const Categories = () => {
  const dispatch = useDispatch();
  const isSmallScreen = window.matchMedia("(max-width: 768px)").matches;

  <div
    className="grid gap-6"
    style={{
      gridTemplateColumns: isSmallScreen
        ? "repeat(auto-fit, minmax(160px, 0.5fr))"
        : "repeat(auto-fit, minmax(215px, 1fr))",
    }}
  >
    {/* Your content here */}
  </div>;

  // Select necessary state from Redux store
  const { isLoading, error, categories } = useSelector(
    (state) => state.products
  );

  // Fetch categories when the component mounts
  useEffect(() => {
    dispatch(fetchAllCategories());
  }, [dispatch]);

  if (isLoading)
    return (
      <div className="min-h-screen flex justify-center items-center">
        <Loader />
      </div>
    );

  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container max-w-[1300px] mx-auto px-4 py-8 min-h-[600px]">
      {/* Header */}
      <div className="textHeader font-bold text-primary text-xl mb-4">
        <h1>Browse by category</h1>
      </div>

      {/* Responsive Grid with minmax */}
      <div
        className="grid gap-6"
        style={{
          gridTemplateColumns: isSmallScreen
            ? "repeat(auto-fit, minmax(160px, 0.5fr))"
            : "repeat(auto-fit, minmax(215px, 1fr))",
        }}
      >
        {categories?.map((category) => (
          <CategoryCard key={category.categoryid} category={category} />
        ))}
      </div>
    </div>
  );
};

export default Categories;
