import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { addToCart } from "@/Store/Slices/cartSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart({ selectedProduct: product, quantity: 1 }));
    toast.success("Added to cart successfully!");
  };
  return (
    <Link
      className="flex flex-col h-full bg-white shadow-md rounded-2xl overflow-hidden hover:scale-105 transition-all duration-300 p-5 gap-2"
      to={`/MediPortal/pharmacy/categories/${product.categoryname}/products/${product.productid}`}
    >
      <div className="image">
        <img
          src={
            product.productimg ||
            `https://res.cloudinary.com/djuhk9ozp/image/upload/v1732922264/DB%20Medicine/v5glkgokpvu1oodc75cy.png`
          }
          alt={product.productname}
          className="w-full h-[160px] object-contain"
        />
      </div>
      <div className="text">
        <h2 className="font-medium">{product.productname}</h2>
        <span className="text-lightGrayText text-[13px] font-bold">
          {product.categoryname}
        </span>
        <div className="flex gap-2 text-tertiary">
          <span className="">From</span>
          <p className="font-bold">${product.productprice}</p>
        </div>
      </div>
      <div className="button w-full">
        <button
          className="bg-primary hover:bg-secondary text-white font-medium py-2 px-4
        rounded-full mt-2 transition-all duration-300 w-full"
          onClick={handleAddToCart}
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
