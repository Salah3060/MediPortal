import "./Styles/App.css";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./Components/Header/Header.jsx";
import Footer from "./Components/Footer/Footer.jsx";
import PharmacyHeader from "./Components/Pharmacy/PharmacyHeader.jsx";
import PharmacyFooter from "./Components/Pharmacy/PharmacyFooter.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import Overlay from "./Components/Header/Overlay.jsx";
import UserInfo from "./Components/UserInfo.jsx";

function App() {
  const location = useLocation();

  const isPharmacyPage = location.pathname.startsWith("/MediPortal/pharmacy");
  const isDoctorDashboard = location.pathname.startsWith("/MediPortal/doctor");
  const [modal, setModal] = useState(false);
  return (
    <>
      {isPharmacyPage ? (
        <PharmacyHeader />
      ) : !isDoctorDashboard ? (
        <Header openUserInfoModal={() => setModal((e) => !e)} />
      ) : (
        ""
      )}
      {modal && <UserInfo />}
      {modal && (
        <Overlay isOpen={modal} toogleSideBar={() => setModal((e) => !e)} />
      )}
      <Outlet />
      {isPharmacyPage ? (
        <PharmacyFooter />
      ) : !isDoctorDashboard ? (
        <Footer />
      ) : (
        ""
      )}

      <ToastContainer />
    </>
  );
}

export default App;
