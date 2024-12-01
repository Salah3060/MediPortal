import { AiOutlineCheckCircle } from "react-icons/ai";

// eslint-disable-next-line react/prop-types
export default function SuccessPopup({ Header }) {
  return (
    <>
      <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg w-96 text-center min-h-56 flex justify-center items-center">
          <span>
            <AiOutlineCheckCircle className="text-green-500 text-6xl mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-green-600">{Header}</h2>
          </span>{" "}
        </div>
      </div>
    </>
  );
}
