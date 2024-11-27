import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import { RiErrorWarningFill } from "react-icons/ri";

const SingleProductPage = () => {
  const { productId } = useParams();

  const product = {
    productId: productId,
    productName: "Product Name",
    image: "https://picsum.photos/200/200",
    productPrice: 100,
    productCategory: 1,
    productDescription:
      "Product Description Product Description Product Description Product Description Product Description Product Description Product Description Product Description",
    ingredients: ["Ingredient 1", "Ingredient 2", "Ingredient 3"],
    manufacturer: "Manufacturer Name",
  };

  const categoryName = "Name Here";

  return (
    <div className="container max-w-[1300px] mx-auto px-4 py-8 flex flex-col gap-8 w-full items-center">
      {/* Product Info Div */}
      <div className="productInfo container bg-gradient-to-r from-[#c2dfe3] to-[#9db4c0] p-4 md:p-6 lg:p-8 flex flex-col md:flex-row gap-8 rounded-xl flex-grow">
        <div className="image">
          <img
            src={product.image}
            alt={product.productName}
            className="w-full h-[200px] md:h-full object-cover rounded-lg"
          />
        </div>
        <div className="info flex flex-col gap-2 w-full">
          <h1 className="text-primary text-xl md:text-3xl font-semibold">
            {product.productName}
          </h1>
          <h2 className="text-primary/80">{categoryName}</h2>
          <button className="w-full md:w-[50%] self-end py-2 bg-white text-primary font-bold rounded-xl hover:bg-primary hover:text-tertiary transition-all duration-300 ease-in-out">
            Add to Cart
          </button>
          <div className="important flex items-center gap-2 mt-2">
            <RiErrorWarningFill className="text-xl text-darkRed" />
            <p className="text-sm md:text-md text-primary/90">
              This page may not cover all the information mentioned in the
              attached pamphlet of the manufacturing company.
            </p>
          </div>
        </div>
      </div>

      {/* Medical Info div */}
      <div className="medicalInfo container bg-gradient-to-r from-[#c2dfe3] to-[#9db4c0] p-4 md:p-6 lg:p-8 flex flex-col gap-8 rounded-xl flex-grow">
        <div className="desc flex flex-col gap-2 border-b pb-6 border-b-primary">
          <h1 className="text-lg md:text-xl text-primary font-bold">
            Medical Description
          </h1>
          <p className="text-sm md:text-md text-primary/80">
            {product.productDescription}
          </p>
        </div>
        <div className="ingredients flex flex-col gap-2 border-b pb-6 border-b-primary">
          <h1 className="text-lg md:text-xl text-primary font-bold">
            Active Ingredients
          </h1>
          <div className="flex flex-wrap gap-2 items-center">
            {product.ingredients.map((ingredient, index) => (
              <p
                key={index}
                className="text-sm md:text-md bg-white px-4 py-2 rounded-xl text-primary hover:text-tertiary hover:bg-primary transition-all duration-300"
              >
                {ingredient}
              </p>
            ))}
          </div>
        </div>
        <div className="manufacture flex flex-col gap-2">
          <h1 className="text-lg md:text-xl text-primary font-bold">
            Manufacture
          </h1>
          <p className="text-sm md:text-md text-primary/80">
            {product.manufacturer}
          </p>
        </div>
      </div>

      {/* MediPortal Disclaimer */}
      <div className="container bg-gradient-to-r from-[#c2dfe3] to-[#9db4c0] p-4 md:p-6 lg:p-8 flex flex-col gap-2 rounded-xl flex-grow">
        <h1 className="text-lg md:text-xl text-primary font-bold">
          Disclaimer
        </h1>
        <p className="text-sm md:text-md text-primary/80">
          MediPortal Pharmacy{"'"}s main goal is to provide customers with
          accurate and reliable information. All information presented here is
          copied from the pamphlet of the medicine provided by the manufacturer,
          hence the accuracy of the information is the responsibility of the
          manufacturer only. Accordingly, please consult your doctor and discuss
          with him all inquiries related to any disease or medication. We aim to
          provide help, not replace the doctor-patient relationship.
        </p>
        <p className="text-sm md:text-md text-primary/80 mt-4">
          MediPortal Pharmacy is a legally registered pharmacy management
          company designed to manage licensed pharmacies within the Arab
          Republic of Egypt. 100% of our medicines are sourced and distributed
          from licensed pharmacies under the regulations of the Egyptian
          Ministry of Health and Population. We do not and will not distribute
          medicines from warehouses. We are and will continue to abide by the
          law regarding obtaining medicines from licensed pharmacies. All of our
          pharmacy websites are available on the Internet, and they are all
          owned and operated by licensed pharmacists within the Arab Republic of
          Egypt. All invoices are issued by licensed pharmacies inside the Arab
          Republic of Egypt.
        </p>
      </div>
    </div>
  );
};

SingleProductPage.propTypes = {
  product: PropTypes.object.isRequired,
};

export default SingleProductPage;
