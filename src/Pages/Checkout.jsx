import LocationPicker from "@/Components/locationPicker";
import { useState } from "react";
import { useSelector } from "react-redux";
import { BsCashCoin } from "react-icons/bs";

const Checkout = () => {
  const [location, setLocation] = useState(null);
  const delivery = 25;
  const discount = 0;
  const { totalPrice } = useSelector((state) => state.cart);

  const handleLocationSelect = (selectedLocation) => {
    setLocation(selectedLocation);
    console.log("Selected Location:", selectedLocation);
  };

  return (
    <div className="container max-w-[1400px] mx-auto px-4 py-6 flex flex-col gap-8 rounded-xl">
      <div className="headerText text-center sm:text-left">
        <h1 className="text-3xl md:text-4xl font-bold text-primary">
          Checkout
        </h1>
      </div>

      <div className="rem flex flex-col lg:flex-row justify-between gap-6">
        {/* Location Picker Section */}
        <div className="location w-full lg:w-[60%]">
          <h2 className="text-2xl font-semibold text-primary mb-4 underline-offset-4 underline">
            Billing Address
          </h2>
          <div className="w-full z-0">
            <LocationPicker onLocationSelect={handleLocationSelect} />
          </div>
        </div>

        {/* Summary Section */}
        <div className="summary w-full lg:w-[40%] border rounded-[20px] py-6 px-6 flex flex-col gap-6 bg-white">
          <div className="title">
            <h1 className="text-lg md:text-xl font-bold text-primary">
              Order Summary
            </h1>
          </div>
          <div className="prices flex flex-col gap-4 pb-4 border-b">
            <div className="single flex justify-between">
              <span className="text-sm md:text-lg text-black/60">Subtotal</span>
              <span className="text-sm md:text-lg font-bold">
                ${totalPrice?.toFixed(2)}
              </span>
            </div>
            <div className="single flex justify-between">
              <span className="text-sm md:text-lg text-black/60">
                Delivery Fee
              </span>
              <span className="text-sm md:text-lg font-bold">
                ${delivery?.toFixed(2)}
              </span>
            </div>
            <div className="single flex justify-between">
              <span className="text-sm md:text-lg">Total</span>
              <span className="text-sm md:text-lg font-bold">
                $
                {(
                  totalPrice -
                  totalPrice * (discount / 100) +
                  delivery
                ).toFixed(2)}
              </span>
            </div>
          </div>
          <button className="bg-[#9db4c0] hover:bg-primary hover:text-tertiary text-primary font-medium py-3 rounded-lg w-full transition-all duration-300 flex justify-center items-center">
            Place Order
          </button>
          <div className="method flex items-center gap-4">
            <BsCashCoin className="text-2xl md:text-3xl text-green-800" />
            <h2 className="text-sm md:text-lg font-bold text-primary/60">
              Cash on Delivery
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
