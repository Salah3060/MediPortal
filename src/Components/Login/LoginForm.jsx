import { Link } from "react-router-dom";

/* eslint-disable react/prop-types */
export default function LoginForm({
  email,
  setEmail,
  password,
  setPass,
  handleSubmit,
}) {
  return (
    <div className="h-lvh w-full flex justify-center items-center text-primary login">
      <div className="lg:w-1/3 md:w-3/5 w-2/3 border-primary border-opacity-50 border text-center  rounded-md shadow-md loginAnimation px-8 pt-6 pb-8 mb-4  backdrop-blur-3xl ">
        <h1 className="font-semi-bold text-4xl my-6">Login</h1>

        <form className="flex flex-col justify-between h-52">
          <input
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            id="mail"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            id="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPass(e.target.value)}
          />
          <span className="flex justify-center">
            <p>forget password?</p>
            <Link to="/MediPortal/ResetPassword" className="text-blue-700 ms-1">
              Reset
            </Link>
          </span>
          <button className="btn" type="submit" onClick={handleSubmit}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
