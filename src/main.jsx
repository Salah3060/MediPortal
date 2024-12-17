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
import DoctorDashboard from "./Pages/DoctorDashboard.jsx";
import Workspaces from "./Components/DoctorDashboard/Workspaces.jsx";
import Appointments from "./Components/DoctorDashboard/Appointments.jsx";
import Stats from "./Components/DoctorDashboard/stats.jsx";
import Availibilities from "./Components/DoctorDashboard/Availibilities.jsx";
import DocOffers from "./Components/DoctorDashboard/Offers.jsx";
import AddUpdateOffer from "./Components/DoctorDashboard/AddUpdateOffer.jsx";
import UpdateMyInfo from "./Components/DoctorDashboard/UpdateMyInfo.jsx";

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
      {
        path: "doctor/:doctorid/",
        element: <DoctorDashboard />,
        children: [
          {
            path: "",
            element: <Stats />,
          },
          {
            path: "Workspaces/",
            element: <Workspaces />,
          },
          {
            path: "Appointments/",
            element: <Appointments />,
          },
          {
            path: "Availibilities/",
            element: <Availibilities />,
          },
          {
            path: "Offers/",
            element: <DocOffers />,
          },
          {
            path: "Add-UpdateOffers/",
            element: <AddUpdateOffer />,
          },
          {
            path: "UpdateMe/",
            element: <UpdateMyInfo />,
          },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
