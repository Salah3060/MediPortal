import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const SearchCard = ({ product }) => {
  return (
    <Link
      to={`/MediPortal/pharmacy/categories/${product.categoryname}/products/${product.productid}`}
      className="resultItem p-4 border-b border-[#c2dfe3] text-lg cursor-pointer transition-all"
    >
      <div className="flex items-center gap-4">
        <img
          src={
            product.productimg ||
            "https://res.cloudinary.com/djuhk9ozp/image/upload/v1732922264/DB%20Medicine/v5glkgokpvu1oodc75cy.png"
          }
          alt={product.productname}
          className="w-16 h-16 object-contain"
        />
        <div className="flex flex-col gap-1 ms-2 text-sm">
          <div className="text-primary font-bold">{product.productname}</div>
          <div className="text-primary/50">{product.categoryname}</div>
          <div className="price flex gap-2 text-[0.8rem]">
            <span className="text-tertiary">From</span>
            <span className="text-primary font-bold">
              ${product.productprice}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

SearchCard.propTypes = {
  product: PropTypes.shape({
    productid: PropTypes.number.isRequired,
    productname: PropTypes.string.isRequired,
    categoryname: PropTypes.string.isRequired,
    productprice: PropTypes.number.isRequired,
    productimg: PropTypes.string,
  }).isRequired,
};

export default SearchCard;
