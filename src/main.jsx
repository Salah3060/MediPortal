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
import Offers from "@/Pages/offers.jsx";
import Cart from "@/Pages/Cart.jsx";
import OrderCheckout from "@/Pages/OrderCheckout.jsx";
import PaymentError from "@/Pages/PaymentError.jsx";
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
import PatientAppointments from "./Pages/PatientAppointments.jsx";
import ResetPassword from "./Pages/ResetPassword.jsx";
import ChangePassword from "./Components/DoctorDashboard/ChangePassword.jsx";
import { Rlogout } from "./Pages/RtoLogout.jsx";
import AnswerQuestions from "./Components/DoctorDashboard/AnswerQuestions.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "*",
        element: <Error />,
      },
      {
        path: "MediPortal/booking/paymenterror",
        element: <PaymentError />,
      },
      {
        path: "MediPortal/search",
        element: <Search />,
      },
      {
        path: "MediPortal/search/doctors/:doctorId",
        element: <SingleDoctor />,
      },
      {
        path: "MediPortal/booking/success",
        element: <SuccessBooking />,
      },
      {
        path: "MediPortal/pharmacy",
        element: <Pharmacy />,
      },
      {
        path: "MediPortal/askquestion",
        element: <AskQuestion />,
      },
      {
        path: "MediPortal/questions",
        element: <QuestionsCats />,
      },
      {
        path: "MediPortal/questions/:speciality",
        element: <QuestionsGroup />,
      },
      {
        path: "MediPortal/pharmacy/categories/:categoryName/products",
        element: <Products />,
      },
      {
        path: "MediPortal/login",
        element: <Login />,
      },
      {
        path: "MediPortal/signup",
        element: <Signup />,
      },
      {
        path: "MediPortal/pharmacy/categories/:categoryName/products/:productId",
        element: <SingleProductPage />,
      },
      {
        path: "MediPortal/pharmacy/cart",
        element: <Cart />,
      },
      {
        path: "MediPortal/pharmacy/checkout",
        element: <OrderCheckout />,
      },
      {
        path: "MediPortal/offers",
        element: <Offers />,
      },
      {
        path: "MediPortal/offers/:offerid/",
        element: <SingleOfferPage />,
      },
      {
        path: "MediPortal/doctor/:doctorid/",
        element: <DoctorDashboard />,
        children: [
          {
            path: "",
            element: <Stats />,
          },
          {
            path: "Workspaces",
            element: <Workspaces />,
          },
          {
            path: "Appointments",
            element: <Appointments />,
          },
          {
            path: "Availabilities",
            element: <Availibilities />,
          },
          {
            path: "Offers",
            element: <DocOffers />,
          },
          {
            path: "Add-UpdateOffers",
            element: <AddUpdateOffer />,
          },
          {
            path: "UpdateMe",
            element: <UpdateMyInfo />,
          },
          {
            path: "changePassword",
            element: <ChangePassword />,
          },
          {
            path: "answerQuestions",
            element: <AnswerQuestions />,
          },
        ],
      },
      {
        path: "MediPortal/patient/myappointments",
        element: <PatientAppointments />,
      },
      {
        path: "MediPortal/ResetPassword/",
        element: <ResetPassword />,
      },
      {
        path: "MediPortal/redirectToLogout/",
        element: <Rlogout />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
