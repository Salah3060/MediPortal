import { createRoot } from "react-dom/client";
import "./Styles/index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import store from "./Store/Store.js";
// import { Provider } from "react-redux";
import Home from "@/Pages/Home.jsx";
import Pharmacy from "@/Pages/Pharmacy.jsx";
import Products from "@/Pages/Products.jsx";

import Login from "./Pages/Login.jsx";
import Signup from "./Pages/signup.jsx";

import SingleProductPage from "@/Pages/SingleProductPage.jsx";

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
        path: "pharmacy",
        element: <Pharmacy />,
      },
      {
        path: "pharmacy/categories/:categoryId/products",
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
        path: "pharmacy/categories/:categoryId/products/:productId",
        element: <SingleProductPage />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  // <Provider store={store}>
  <RouterProvider router={router} />
  // </Provider>
);
