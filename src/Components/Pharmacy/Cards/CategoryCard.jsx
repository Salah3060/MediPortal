import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const CategoryCard = ({ category }) => {
  return (
    <Link
      className="flex flex-col h-full bg-white shadow-md rounded-lg overflow-hidden hover:scale-105 transition-all duration-300"
      to={`/MediPortal/pharmacy/categories/${category.categoryname}/products`}
    >
      <div className="image flex-1 overflow-hidden">
        <img
          src={
            category.categoryimg ||
            `https://res.cloudinary.com/djuhk9ozp/image/upload/v1732921047/DB%20categories/${category.categoryid}.png`
          }
          alt={category.categoryname}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="name p-4">
        <h2 className="text-center font-medium">{category.categoryname}</h2>
      </div>
    </Link>
  );
};

CategoryCard.propTypes = {
  category: PropTypes.object.isRequired,
};

export default CategoryCard;
