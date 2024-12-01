import { useEffect } from "react";
import { useState } from "react";
import { clearUser, userLogin } from "../Store/Slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Components/Loader";
import SuccessPopup from "../Components/Successpopup";
import { useNavigate } from "react-router-dom";
import ErrorPopup from "../Components/Errorpopup";
import LoginForm from "../Components/Login/LoginForm";
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPass] = useState("");
  const navigate = useNavigate();
  const dispath = useDispatch();
  const { loading, error, status } = useSelector((state) => state.user); // Select the necessary state

  // use function login to login user
  useEffect(() => {
    if (status === "success") {
      const timer = setTimeout(() => {
        navigate("/MediPortal/");
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [status, navigate]);
  function handleSubmit(e) {
    e.preventDefault();
    dispath(userLogin({ email, password }));
  }
  return (
    <div className="min-h-dvh">
      {status !== "pending" && (
        <LoginForm
          email={email}
          password={password}
          setEmail={setEmail}
          setPass={setPass}
          handleSubmit={handleSubmit}
        />
      )}
      {loading && <Loader />}
      {status === "success" && <SuccessPopup Header="login Successfully" />}
      {status === "failed" && (
        <ErrorPopup
          Header="couldn't login"
          Msg={error}
          closePopup={() => {
            dispath(clearUser());
            setEmail("");
            setPass("");
          }}
        />
      )}
    </div>
  );
}
