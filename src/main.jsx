import { createRoot } from "react-dom/client";
import "./Styles/index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import store from "./Store/Store.js";
import { Provider } from "react-redux";
import Home from "@/Pages/Home.jsx";
import Pharmacy from "@/Pages/Pharmacy.jsx";
import Products from "@/Pages/Products.jsx";
import AskQuestion from "@/Pages/AskQuestion.jsx";
import Offers from "@/Pages/Offers.jsx";
import Cart from "@/Pages/Cart.jsx";
import OrderCheckout from "@/Pages/OrderCheckout.jsx";
import PaymentError from "@/Pages/paymentError.jsx";
import Error from "@/Pages/Error.jsx";
import QuestionsCats from "@/Pages/QuestionsCats.jsx";
import QuestionsGroup from "@/Pages/QuestionsGroup.jsx";
import SuccessBooking from "@/Pages/SuccessBooking.jsx";

import Login from "./Pages/Login.jsx";
import Signup from "./Pages/signup.jsx";

import SingleProductPage from "@/Pages/SingleProductPage.jsx";
import Search from "@/Pages/Search.jsx";
import SingleDoctor from "@/Pages/SingleDoctor.jsx";
import SingleOfferPage from "./Pages/SingleOfferPage.jsx";

const router = createBrowserRouter([
  {
    path: "/MediPortal/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "*",
        element: <Error />,
      },
      {
        path: "paymenterror",
        element: <PaymentError />,
      },
      {
        path: "search",
        element: <Search />,
      },
      {
        path: "search/doctors/:doctorId",
        element: <SingleDoctor />,
      },
      {
        path: "booking/success",
        element: <SuccessBooking />,
      },
      {
        path: "pharmacy",
        element: <Pharmacy />,
      },
      {
        path: "askquestion",
        element: <AskQuestion />,
      },
      {
        path: "questions",
        element: <QuestionsCats />,
      },
      {
        path: "questions/:speciality",
        element: <QuestionsGroup />,
      },
      {
        path: "pharmacy/categories/:categoryName/products",
        element: <Products />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "signup",
        element: <Signup />,
      },
      {
        path: "pharmacy/categories/:categoryName/products/:productId",
        element: <SingleProductPage />,
      },
      {
        path: "pharmacy/cart",
        element: <Cart />,
      },
      {
        path: "pharmacy/checkout",
        element: <OrderCheckout />,
      },
      {
        path: "offers",
        element: <Offers />,
      },
      {
        path: "offers/:offerid/",
        element: <SingleOfferPage />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
