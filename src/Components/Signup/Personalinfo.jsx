/* eslint-disable react/prop-types */
import { useState } from "react";
import {
  ValidataMail,
  ValidataName,
  ValidataPassword,
  ValidataPhone,
} from "../../Utils/null";
import InputField from "./InputField";
import Popup from "../popup";

export default function Personalinfo({ user, setUser, setStep }) {
  const [error, setError] = useState("");
  function StepsValidation(e) {
    e.preventDefault();

    if (!user.firstname.length) {
      setError("First name is required");
      return;
    }
    if (!user.lastname.length) {
      setError("Last name is required");
      return;
    }
    if (!user.email.length) {
      setError("Email is required");
      return;
    }
    if (!user.password.length) {
      setError("Password is required");
      return;
    }
    if (!user.gender.length) {
      setError("Gender is required");
      return;
    }
    if (!user.gender.length) {
      setError("Gender is required");
      return;
    }
    if (!user.role.length) {
      setError("Role is required");
      return;
    }
    if (!user.phonenumber.length) {
      setError("Phone number is required");
      return;
    }
    setError("");
    ValidataMail(user.email) &&
      user.email.length &&
      ValidataPhone(user.phonenumber) &&
      user.phonenumber.length &&
      ValidataName(user.firstname) &&
      user.firstname.length &&
      ValidataName(user.lastname) &&
      user.lastname.length &&
      ValidataPassword(user.password) &&
      user.password.length &&
      setStep(2);
  }
  return (
    <form className="flex flex-col justify-between">
      <div className=" flex justify-evenly my-10">
        {error && (
          <Popup
            Header="Missing Data"
            Msg={error}
            closePopup={() => setError("")}
          />
        )}
        <span className="grid sm:grid-cols-2 grid-cols-1 gap-5 w-full ">
          <InputField
            Validate={ValidataName}
            user={user}
            setUser={setUser}
            mykey="firstname"
            placeholder={"First Name"}
            errorMsg={`Invalid name !`}
            isRequired={true}
          />

          <InputField
            Validate={ValidataName}
            user={user}
            setUser={setUser}
            mykey="lastname"
            placeholder={"Last Name"}
            errorMsg={`Invalid name !`}
            isRequired={true}
          />

          <InputField
            Validate={ValidataMail}
            user={user}
            setUser={setUser}
            mykey="email"
            placeholder={"Email"}
            errorMsg={`Invalid Email!`}
            isRequired={true}
          />
          <InputField
            Validate={ValidataPhone}
            user={user}
            setUser={setUser}
            mykey="phonenumber"
            placeholder={"Phone number"}
            errorMsg={`Invalid phone number!`}
            isRequired={true}
          />
          <InputField
            Validate={ValidataPassword}
            user={user}
            setUser={setUser}
            mykey="password"
            placeholder={"Password"}
            errorMsg={`Invalid Password!`}
            isRequired={true}
            type="Password"
          />
          <select
            name="gender"
            id="gender"
            className={`sing-up-input-style col-start-1`}
            value={user.gender}
            onChange={(e) =>
              setUser((us) => ({ ...us, gender: e.target.value }))
            }
            required
          >
            <option value="" disabled selected>
              Gender
            </option>

            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          <select
            name="role"
            id="role"
            className={`sing-up-input-style col-start-1`}
            value={user.role}
            onChange={(e) => setUser((us) => ({ ...us, role: e.target.value }))}
            required
          >
            <option value="" disabled selected>
              Role
            </option>
            <option value="patient">Patient</option>
            <option value="doctor">Doctor</option>
          </select>

          <input
            type="date"
            className={`sing-up-input-style col-start-1`}
            value={user.birthdate}
            onChange={(e) =>
              setUser((us) => ({ ...us, birthdate: e.target.value }))
            }
            required
          />
        </span>
      </div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        onClick={StepsValidation}
        type="submit"
      >
        Next
      </button>
    </form>
  );
}
