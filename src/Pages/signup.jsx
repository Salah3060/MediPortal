import { useEffect, useState } from "react";
import Stepper from "../Components/Signup/Stepper";
import Personalinfo from "../Components/Signup/Personalinfo";
import Patient from "../Components/Signup/Patient";
import Doctor from "../Components/Signup/Doctor";
import Loader from "../Components/Loader";
import { clearUser, userSignup } from "../Store/Slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import SuccessPopup from "../Components/SuccesspopupMSG";
import ErrorPopup from "../Components/ErrorPopup";
import { useNavigate } from "react-router-dom";
import { scrollToTop } from "../Utils/functions.util";
export default function Signup() {
  const dispath = useDispatch();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    firstname: "",
    lastname: "",
    phonenumber: "",
    email: "",
    gender: "",
    birthdate: "",
    role: "",
    otherDisease: "",
    chronicDiseases: [],
    bloodtype: "",
    password: "",
    license: "",
    speciality: "",
  });
  const [step, setStep] = useState(1);
  const [error, setError] = useState("");
  const {
    error: errorMsg,
    status,
    userRole,
    userId,
  } = useSelector((state) => state.user); // Select the necessary state
  Loader;
  function fetchData() {
    const userData = {
      firstName: user.firstname,
      lastName: user.lastname,
      email: user.email,
      phoneNumber: user.phonenumber,
      gender: user.gender,
      birthDate: user.birthdate,
      password: user.password,
      userRole: user.role,
      bloodType: user.bloodtype,
      chronicDisease: user.chronicDiseases,
      specialization: user.speciality,
      licenseNumber: user.license,
    };
    dispath(userSignup(userData));
  }
  useEffect(() => {
    document.title = "MediPortal | Signup";
    scrollToTop();
  }, []);
  useEffect(() => {
    if (status === "success") {
      const timer = setTimeout(() => {
        userRole === "Doctor"
          ? navigate(`/MediPortal/doctor/${userId}/`)
          : history.back();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [navigate, status, userId, userRole]);
  return (
    <div className="min-h-dvh">
      {
        <div className="min-w-h-lvh w-full flex justify-center items-center text-primary">
          <div className="lg:w-1/3 md:w-3/5 w-2/3 min-w-fit border-primary border-opacity-50 border text-center  rounded- shadow-md loginAnimation px-8 pt-6 pb-8 mb-4  backdrop-blur-3xl my-20  ">
            <h1 className="font-semi-bold text-4xl mt-6 mb-10">Sign up</h1>
            <div className="w-full flex justify-center">
              <Stepper currentStep={step} />
            </div>
            {step === 1 && (
              <Personalinfo
                user={user}
                setUser={setUser}
                setStep={setStep}
                setError={setError}
              />
            )}
            {step === 2 && user.role === "patient" && (
              <Patient
                user={user}
                setUser={setUser}
                setStep={setStep}
                submit={fetchData}
                setError={setError}
              />
            )}
            {step === 2 && user.role === "doctor" && (
              <Doctor
                user={user}
                setUser={setUser}
                setStep={setStep}
                submit={fetchData}
                setError={setError}
              />
            )}
            {step === 3 && status === "pending" && <Loader />}
          </div>
        </div>
      }
      {status === "success" && <SuccessPopup Header="login Successfully" />}
      {status === "failed" && (
        <ErrorPopup
          Header="couldn't Signup"
          Msg={errorMsg}
          closePopup={() => {
            dispath(clearUser());
            setStep(1);
          }}
        />
      )}
      {error && (
        <ErrorPopup
          Header="Missing data"
          Msg={error}
          closePopup={() => {
            setError("");
          }}
        />
      )}
    </div>
  );
}
