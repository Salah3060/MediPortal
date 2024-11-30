/* eslint-disable react/prop-types */
import { MdErrorOutline } from "react-icons/md";

export default function InputField({
  Validate,
  mykey,
  user,
  setUser,
  placeholder,
  errorMsg,
  isRequired = false,
  Maxwidth = "max-w-52",
  type = "text",
}) {
  return (
    <span className={`${Maxwidth} flex flex-col items-center w-full`}>
      <span className="flex items-center gap-2 w-full relative">
        <input
          className={`border border-gray-300 text-gray-900 text-sm rounded-lg block  p-2.5 w-full 
                      ${
                        Validate(user[mykey])
                          ? "bg-gray-50 "
                          : "bg-darkRed bg-opacity-40"
                      }`}
          type={type}
          placeholder={placeholder}
          value={user[mykey]}
          onChange={(e) =>
            setUser((prevState) => ({
              ...prevState,
              [mykey]: e.target.value,
            }))
          }
          required={isRequired}
        />
        <MdErrorOutline
          className={`text-xl text-darkRed absolute right-2
                      ${Validate(user[mykey]) ? "hidden" : ""}`}
        />
      </span>
      <p
        className={`text-xs  text-darkRed 
          ${Validate(user[mykey]) ? "hidden" : ""}`}
      >
        {errorMsg}
      </p>
    </span>
  );
}
