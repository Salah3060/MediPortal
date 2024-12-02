import "./Styles/App.css";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./Components/Header/Header.jsx";
import Footer from "./Components/Footer/Footer.jsx";
import PharmacyHeader from "./Components/Pharmacy/PharmacyHeader.jsx";
import PharmacyFooter from "./Components/Pharmacy/PharmacyFooter.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; 

function App() {
  const location = useLocation();

  const isPharmacyPage = location.pathname.startsWith("/MediPortal/pharmacy");

  return (
    <>
      {isPharmacyPage ? <PharmacyHeader /> : <Header />}
      <Outlet />
      {isPharmacyPage ? <PharmacyFooter /> : <Footer />}
      <ToastContainer />
    </>
  );
}

export default App;