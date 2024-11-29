import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [submit, setSubmit] = useState(false);
  useEffect(() => {
    async function fetchData() {
      const resp = axios("127.0.0.1:3000/auth/login", {
        email: email,
        password: pass,
      });
      console.log(resp);
    }

    if (!submit) return;
    fetchData();
    setSubmit((e) => !e);
  }, [submit, email, pass]);
  return (
    <div className="h-lvh w-full flex justify-center items-center text-primary">
      <div className="lg:w-1/3 md:w-3/5 w-2/3 border-primary border-opacity-50 border text-center  rounded-md shadow-md loginAnimation px-8 pt-6 pb-8 mb-4  backdrop-blur-3xl">
        <h1 className="font-semi-bold text-4xl my-6">Login</h1>

        <form className="flex flex-col justify-between h-52">
          <input
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500  "
            id="mail"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            id="mail"
            type="password"
            placeholder="Password"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
          />
          <button className="btn" type="submit">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
