import { AiOutlineCloseCircle } from "react-icons/ai";

// eslint-disable-next-line react/prop-types
export default function ErrorPopup({ Header, Msg, closePopup = null }) {
  return (
    <>
      <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg w-96 text-center">
          <AiOutlineCloseCircle className="text-red-500 text-6xl mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-red-600">{Header}</h2>
          <p className="text-gray-700 mb-4">{Msg}</p>
          <button
            onClick={closePopup}
            className={`bg-red-500 text-white p-2 rounded hover:bg-red-700 ${
              closePopup ? "" : "hidden"
            }`}
          >
            Close
          </button>
        </div>
      </div>
    </>
  );
}
