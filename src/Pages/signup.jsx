import { useState } from "react";
import Stepper from "../Components/Signup/Stepper";
import Personalinfo from "../Components/Signup/Personalinfo";
import Patient from "../Components/Signup/Patient";
import Doctor from "../Components/Signup/Doctor";

export default function Signup() {
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

  return (
    <div className="min-w-h-lvh w-full flex justify-center items-center text-primary">
      <div className="lg:w-1/3 md:w-3/5 w-2/3 min-w-fit border-primary border-opacity-50 border text-center  rounded- shadow-md loginAnimation px-8 pt-6 pb-8 mb-4  backdrop-blur-3xl my-20  ">
        <h1 className="font-semi-bold text-4xl mt-6 mb-10">Sign up</h1>
        <Stepper currentStep={step} />
        {step === 1 && (
          <Personalinfo user={user} setUser={setUser} setStep={setStep} />
        )}
        {step === 2 && user.role === "patient" && (
          <Patient user={user} setUser={setUser} setStep={setStep} />
        )}
        {step === 2 && user.role === "doctor" && (
          <Doctor user={user} setUser={setUser} setStep={setStep} />
        )}
      </div>
    </div>
  );
}
