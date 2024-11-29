import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  return (
    <Link
      className="flex flex-col h-full bg-white shadow-md rounded-2xl overflow-hidden hover:scale-105 transition-all duration-300 p-5 gap-2"
      to={`/MediPortal/pharmacy/categories/${product.categoryId}/products/${product.id}`}
    >
        <div className="image">
          <img
          src={product.image}
          alt={product.name}
          className="w-full h-[160px] object-cover"
        />
      </div>
      <div className="text">
        <h2 className="font-medium">{product.name}</h2>
        <span className="text-lightGrayText text-[13px] font-bold">
          {product.category}
        </span>
        <div className="flex gap-2 text-tertiary">
          <span className="">From</span>
          <p className="font-bold">${product.price}</p>
        </div>
      </div>
      <div className="button w-full">
        <button
          className="bg-primary hover:bg-secondary text-white font-medium py-2 px-4
        rounded-full mt-2 transition-all duration-300 w-full"
        >
          Add to Cart
        </button>
      </div>
    </Link>
  );
};

ProductCard.propTypes = {
  product: PropTypes.object.isRequired,
};

export default ProductCard;
