import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  ChangePass,
  CheckVeri,
  SendVerificationCode,
} from "../Store/Slices/resetPasswordSlice";
import { toast } from "react-toastify";
import { data, useNavigate } from "react-router-dom";

export default function ResetPassword() {
  const { step, success } = useSelector((state) => state.resetPasswoed);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  function handleClick(e) {
    e.preventDefault();
    if (step === 1) {
      dispatch(SendVerificationCode(email));
    }
    if (step === 2) {
      const data = {
        email: email,
        data: {
          verificationCode: code,
        },
      };

      dispatch(CheckVeri(data));
    }
    if (step === 3) {
      const data = {
        email: email,
        data: {
          verificationCode: code,
          password: password,
        },
      };
      dispatch(ChangePass(data));
    }
  }
  useEffect(() => {
    if (!success) return;
    toast.success("Successfully changed");
    toast.success("redirecting to home page");
    const timeOutId = setTimeout(() => {
      navigate("/");
    }, 2000);
    return () => {
      clearTimeout(timeOutId);
    };
  }, [navigate, success]);
  return (
    <div className="h-lvh w-full flex justify-center items-center text-primary login">
      <div className="lg:w-1/3 md:w-3/5 w-2/3 border-primary border-opacity-50 border text-center  rounded-md shadow-md loginAnimation px-8 pt-6 pb-8 mb-4  backdrop-blur-3xl ">
        <h1 className="font-semi-bold text-4xl my-6">Reset Password</h1>

        <form className="flex flex-col justify-between h-52">
          <input
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            id="mail"
            type="email"
            placeholder="Enter your email to recieve a verification code"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            disabled={step >= 2}
          />
          {step >= 2 && (
            <input
              className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 `}
              id="Verificationcode"
              type="number"
              placeholder="Verification code"
              value={code}
              onChange={(e) => {
                const val = e.target.value;
                if (val.length <= 8) setCode(val);
              }}
              disabled={step == 3}
            />
          )}
          {step == 3 && (
            <input
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              id="password"
              type="password"
              placeholder="New Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          )}
          <button className="btn" type="submit" onClick={handleClick}>
            {step <= 2 ? "Next" : "Change Password"}
          </button>
        </form>
      </div>
    </div>
  );
}
