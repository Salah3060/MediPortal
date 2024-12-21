import PropTypes from "prop-types";
import ProductCard from "../Cards/ProductCard";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "@/Store/Slices/productsSlice";
import { useEffect } from "react";
import Loader from "../../Loader";

const ProductsList = ({ catName }) => {
  const dispatch = useDispatch();
  const { isLoading, error, selectedItems } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    dispatch(fetchProducts(catName));
  }, [dispatch, catName]);

  useEffect(() => {
    document.title = `Pharmacy | ${catName}`;
  }, [catName]);

  if (isLoading) return <Loader />;

  if (error) return <div>Error: {error}</div>;
  return (
    <div className="container max-w-[1300px] mx-auto px-4 py-8 min-h-[71vh]">
      {/* Header */}
      <div className="textHeader font-bold text-primary text-xl mb-4">
        <h1>{catName}</h1>
      </div>

      {/* Responsive Grid with minmax */}
      <div
        className="grid gap-6"
        style={{
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        }}
      >
        {selectedItems.map((product) => (
          <ProductCard key={product.productid} product={product} />
        ))}
      </div>
    </div>
  );
};

ProductsList.propTypes = {
  catName: PropTypes.string.isRequired,
};

export default ProductsList;
