import { useState } from "react";
import { Link } from "react-router-dom";
import { askQuestion } from "@/API/questionsApi";
import ErrorPopup from "@/Components/ErrorPopup";
import Loader from "@/Components/Loader";
import Chatbot from "@/Components/Questions/Chatbot";
import { useEffect } from "react";
import { scrollToTop } from "@/Utils/functions.util";
import SuccessPopup from "../Components/SuccesspopupMSG.jsx";

const AskQuestion = () => {
  const [selectedStatus, setSelectedStatus] = useState("myself"); // Default selection
  const [selectedGender, setSelectedGender] = useState("male"); // Default selection
  const [questionData, setQuestionData] = useState({
    question: "",
    speciality: "General",
    age: "",
    gender: "male",
  });
  const [loading, setLoading] = useState(false); // To track loading state
  const [success, setSuccess] = useState(false); // To track success state
  const [error, setError] = useState(false); // To track error state

  const handleStatusChange = (type) => {
    setSelectedStatus(type);
  };

  useEffect(() => {
    document.title = "MediPortal | Ask Question";
    scrollToTop();
  }, []);

  const handleGenderChange = (gender) => {
    setSelectedGender(gender);
    setQuestionData((prev) => ({ ...prev, gender }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setQuestionData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    setLoading(true); // Start loading
    try {
      // Call the askQuestion API function
      const response = await askQuestion(questionData);

      // Set success state and reset loading
      setSuccess(true);
      setLoading(false);

      // Hide the success popup after 3 seconds
      setTimeout(() => {
        setSuccess(false);
      }, 3000);
    } catch (error) {
      console.error("Error Submitting Question:", error);

      // Set error state and reset loading
      setError(true);
      setLoading(false);

      // Hide the error popup after 3 seconds
      setTimeout(() => {
        setError(false);
      }, 3000);
    }
  };

  return (
    <div className="container flex justify-center items-center w-full py-8 px-4 mx-auto">
      <div className="bg-gradient-to-bl from-[#c2dfe3] to-[#9db4c0] p-[20px] md:p-[40px] flex flex-col gap-6 rounded-xl w-full max-w-[800px]">
        {/* Question Section */}
        <div className="field flex flex-col gap-4">
          <div className="flex flex-col md:flex-row gap-2 items-start md:items-center">
            <h1 className="text-md font-semibold">Your question</h1>
            <span className="text-sm text-gray-600">
              {"(Your identity will be anonymous)"}
            </span>
          </div>
          <input
            type="text"
            name="speciality"
            value={questionData.speciality}
            onChange={handleInputChange}
            className="bg-transparent border-primary border rounded-xl px-4 py-2 outline-none placeholder:text-primary/80"
            placeholder="Specialty: General, Cardiology, etc."
          />
          <textarea
            name="question"
            value={questionData.question}
            onChange={handleInputChange}
            className="bg-transparent border-primary border rounded-xl px-4 py-2 outline-none placeholder:text-primary/80 h-[120px] resize-none"
            placeholder="Question Description (Explanation of medical symptoms)"
          />
        </div>

        {/* Question For Section */}
        <div className="field flex flex-col gap-4">
          <h1 className="text-md font-semibold">The question is for</h1>
          <div className="buttons flex flex-col sm:flex-row gap-4 w-full">
            <button
              onClick={() => handleStatusChange("myself")}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ease-in-out w-full sm:w-1/2 ${
                selectedStatus === "myself"
                  ? "bg-primary text-tertiary"
                  : "bg-gray-100 text-primary/80"
              }`}
            >
              For myself
            </button>
            <button
              onClick={() => handleStatusChange("another")}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ease-in-out w-full sm:w-1/2 ${
                selectedStatus === "another"
                  ? "bg-primary text-tertiary"
                  : "bg-gray-100 text-primary/80"
              }`}
            >
              For another person
            </button>
          </div>
        </div>

        {/* Gender Section */}
        <div className="field flex flex-col gap-4">
          <h1 className="text-md font-semibold">Select Gender</h1>
          <div className="buttons flex flex-col sm:flex-row gap-4 w-full">
            <button
              onClick={() => handleGenderChange("male")}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ease-in-out w-full sm:w-1/2 ${
                selectedGender === "male"
                  ? "bg-primary text-tertiary"
                  : "bg-gray-100 text-primary/80"
              }`}
            >
              Male
            </button>
            <button
              onClick={() => handleGenderChange("female")}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ease-in-out w-full sm:w-1/2 ${
                selectedGender === "female"
                  ? "bg-primary text-tertiary"
                  : "bg-gray-100 text-primary/80"
              }`}
            >
              Female
            </button>
          </div>
        </div>

        {/* Age Section */}
        <div className="field flex flex-col gap-4">
          <div className="flex flex-col md:flex-row gap-2 items-start md:items-center">
            <h1 className="text-md font-semibold">How Old Are You</h1>
            <span className="text-sm text-gray-600">{"(years old)"}</span>
          </div>
          <input
            type="text"
            name="age"
            value={questionData.age}
            onChange={handleInputChange}
            className="bg-transparent border-primary border rounded-xl px-4 py-2 outline-none placeholder:text-primary/80"
            placeholder="Add Age"
          />
        </div>

        {/* Submit Button */}
        <div className="SubmitButton w-full mt-8">
          {loading ? (
            <button
              className="bg-white text-primary/80 font-semibold py-3 rounded-xl w-full transition-all duration-300"
              disabled={loading}
            >
              <Loader />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="bg-white text-primary/80 hover:text-tertiary hover:bg-primary font-semibold py-3 rounded-xl w-full transition-all duration-300"
            >
              Submit
            </button>
          )}
        </div>

        {/* Link to View Asked Questions */}
        <div className="SubmitButton w-full mt-2">
          <Link to={"/MediPortal/questions"}>
            <button className="bg-white text-primary/80 hover:text-tertiary hover:bg-primary font-semibold py-3 rounded-xl w-full transition-all duration-300">
              Or See Asked Questions
            </button>
          </Link>
        </div>
      </div>

      {/* ChatBot */}
      <Chatbot />
      {/* Display Success or Error Popup based on submission outcome */}
      {success && <SuccessPopup Header="Question Submitted Successfully" />}
      {error && <ErrorPopup Header="Error Submitting Question" />}
    </div>
  );
};

export default AskQuestion;
