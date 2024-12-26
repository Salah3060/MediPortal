import { useDispatch } from "react-redux";
import { logout } from "../Store/Slices/userSlice";
import { useNavigate } from "react-router-dom";

export function Rlogout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <div className="min-h-lvh flex justify-center items-center ">
      <button
        className="btn w-96 h-64
        text-3xl
      "
        onClick={() => {
          // dispatch(logout());
          navigate("/");
        }}
      >
        GO HOME
      </button>
    </div>
  );
}
