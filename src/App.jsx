import "./Styles/App.css";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import Header from "./Components/Header/Header.jsx";
import Footer from "./Components/Footer/Footer.jsx";
import PharmacyHeader from "./Components/Pharmacy/PharmacyHeader.jsx";
import PharmacyFooter from "./Components/Pharmacy/PharmacyFooter.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import Overlay from "./Components/Header/Overlay.jsx";
import UserInfo from "./Components/UserInfo.jsx";
import { BiSolidTime } from "react-icons/bi";
import { useSelector } from "react-redux";

function App() {
  const location = useLocation();

  const isPharmacyPage = location.pathname.startsWith("/MediPortal/pharmacy");
  const isDoctorDashboard = location.pathname.startsWith("/MediPortal/doctor");
  const [modal, setModal] = useState(false);
  const { status } = useSelector((state) => state.user); // Select the necessary state
  const navigate = useNavigate();
  return (
    <>
      {isPharmacyPage ? (
        <PharmacyHeader />
      ) : !isDoctorDashboard ? (
        <Header openUserInfoModal={() => setModal((e) => !e)} />
      ) : (
        ""
      )}

      {status === "success" && !isDoctorDashboard && (
        <Link className="w-full " to={"/MediPortal/patient/myappointments"}>
          <div className="flex items-center space-x-4 fixed left-5 bottom-5 z-20">
            <button className="bg-primary text-tertiary p-4 rounded-full shadow-lg hover:bg-[#9db4c0] hover:text-primary flex items-center transition-all duration-300">
              <BiSolidTime className="text-xl" />
              <span className="text-sm sm:text-base font-medium hidden sm:block px-4 py-2 rounded-xl">
                My Appointments
              </span>
            </button>
          </div>
        </Link>
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
