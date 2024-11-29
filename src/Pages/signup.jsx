/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { useState } from "react";
import Stepper from "../Components/Signup/Stepper";
import Personalinfo from "../Components/Signup/Personalinfo";
import Patient from "../Components/Signup/Patient";
export default function Signup() {
  const [user, setUser] = useState({
    firstname: "dsad",
    lastname: "dsad",
    phonenumber: "01120020451",
    email: "era@dsa.com",
    gender: "male",
    birthdate: "2004-10-06",
    role: "patient",
    otherDisease: "",
    chronicDiseases: [],
    bloodtype: "",
  });
  const [step, setStep] = useState(1);

  useEffect(
    function () {
      console.log(user);
    },
    [user]
  );

  return (
    <div className="min-w-h-lvh w-full flex justify-center items-center text-primary">
      <div className="lg:w-1/3 md:w-3/5 w-2/3 min-w-fit border-primary border-opacity-50 border text-center  rounded-md shadow-md loginAnimation px-8 pt-6 pb-8 mb-4  backdrop-blur-3xl my-20">
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

function Doctor({ user, setUser, setStep }) {
  return (
    <form className="flex flex-col justify-between">
      <div className=" flex justify-evenly my-10">
        <span className="grid sm:grid-cols-2 grid-cols-1 gap-5 w-full ">
          Doctor
        </span>
      </div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        onClick={() => {}}
        type="submit"
      >
        Next
      </button>
    </form>
  );
}
