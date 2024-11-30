import SearchProducts from "@/Components/Pharmacy/Products/SearchProducts";
import { useParams, Link } from "react-router-dom";
import ProductsList from "@/Components/Pharmacy/Products/ProductsList";

const Products = () => {
  const { categoryName } = useParams();
  return (
    <div>
      <div className="bg-primary w-full py-2">
        <SearchProducts />
      </div>
      <div className="py-2">
        <div className="container max-w-[1500px] mx-auto flex items-center px-4 py-2 gap-2 text-[12px]">
          <Link
            className="font-bold text-tertiary hover:text-tertiary/50 transition-all duration-300"
            to={"/MediPortal/pharmacy"}
          >
            MediPortal Pharmacy
          </Link>{" "}
          / <span>{categoryName}</span>
        </div>
      </div>

      <div className="bg-[#9db4c0]">
        <ProductsList catName={categoryName} />
      </div>
    </div>
  );
};

export default Products;
