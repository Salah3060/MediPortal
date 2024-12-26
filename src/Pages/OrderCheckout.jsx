import LocationPicker from "@/Components/locationPicker";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { BsCashCoin } from "react-icons/bs";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { Link, useNavigate } from "react-router-dom";
import { placeOrder } from "@/API/PharmacyApi";
import { clearCart } from "../Store/Slices/cartSlice";
import { useDispatch } from "react-redux";

const CheckoutOverlay = () => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white px-12 py-8 rounded-lg shadow-lg text-center">
        <h2 className="text-xl font-bold text-darkRed">
          You must be logged in to Check Out
        </h2>
        <p className="text-gray-700 mt-2">
          Please log in to proceed to the checkout page.
        </p>

        <div className="flex w-full justify-around">
          <Link to={"/MediPortal/login"}>
            <button className="bg-primary text-white px-8 py-2 rounded-xl mt-4">
              Log In
            </button>
          </Link>
          <Link to={"/MediPortal/"}>
            <button className="bg-primary text-white px-8 py-2 rounded-xl mt-4">
              Home
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

const OrderCheckout = () => {
  const [location, setLocation] = useState(null);
  const [phone, setPhone] = useState("");
  const dispatch = useDispatch();
  const [orderData, setOrderData] = useState({
    totalAmount: 0,
    cart: [],
  });
  const [popupMessage, setPopupMessage] = useState(null); // For showing success or error message
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const delivery = 25;
  const discount = 0;

  const cartItems = useSelector((state) => state.cart.items); // Assuming this contains cart details
  const totalPrice = useSelector((state) => state.cart.totalPrice); // Assuming this is total price
  const { firstname, lastname, email, phonenumber, status } = useSelector(
    (state) => state.user
  );

  useEffect(() => {
    setPhone(phonenumber);

    // Update the `orderData` state with the cart and total amount
    const cart = cartItems.map((item) => ({
      productId: item.id,
      productQuantity: item.quantity,
    }));

    setOrderData({
      totalAmount: totalPrice + delivery,
      cart,
    });
  }, [cartItems, totalPrice, phonenumber]);

  const handleLocationSelect = (selectedLocation) => {
    setLocation(selectedLocation);
  };

  const handlePlaceOrder = async () => {
    setLoading(true);
    try {
      const response = await placeOrder(orderData);

      // Show success message
      setPopupMessage("Order placed successfully!");
      dispatch(clearCart());
      setLoading(false);

      // Redirect after 3 seconds
      setTimeout(() => {
        setPopupMessage(null);
        navigate("/");
      }, 3000);
    } catch (error) {
      console.error("Order Error:", error);

      // Show error message
      setPopupMessage("Order placement failed. Please try again.");
    }
  };

  if (status !== "success") return <CheckoutOverlay />;

  return (
    <div className="container max-w-[1400px] mx-auto px-4 py-6 flex flex-col gap-8 rounded-xl">
      {popupMessage && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white px-12 py-8 rounded-lg shadow-lg text-center">
            <h2 className="text-xl font-bold text-green-500">{popupMessage}</h2>
            {popupMessage === "Order placed successfully!" && (
              <p className="text-gray-700 mt-2">
                Redirecting to the home page...
              </p>
            )}
            {popupMessage !== "Order placed successfully!" && (
              <button
                onClick={() => setPopupMessage(null)}
                className="bg-primary text-white px-8 py-2 rounded-xl mt-4"
              >
                Close
              </button>
            )}
          </div>
        </div>
      )}

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

          <div className="customerInfo flex flex-col gap-4 pb-4 border-b">
            <div className="names flex justify-between">
              <input
                type="text"
                placeholder="First Name"
                value={firstname}
                className="w-[48%] py-2 px-4 border rounded-lg"
              />
              <input
                type="text"
                placeholder="Last Name"
                value={lastname}
                className="w-[48%] py-2 px-4 border rounded-lg"
              />
            </div>
            <div className="email">
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                className="w-full py-2 px-4 border rounded-lg"
              />
            </div>
            <div className="phoneNumber w-full">
              <PhoneInput
                country={"eg"}
                value={phone}
                onChange={(value) => setPhone(value)}
                inputClass="w-full py-2 px-4 border rounded-lg"
                containerClass="w-full"
                buttonClass="border-l"
              />
            </div>
          </div>
          <button
            onClick={handlePlaceOrder}
            className="bg-[#9db4c0] hover:bg-primary hover:text-tertiary text-primary font-medium py-3 rounded-lg w-full transition-all duration-300 flex justify-center items-center"
          >
            {loading ? "Placing Order..." : "Place Order"}
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

export default OrderCheckout;
