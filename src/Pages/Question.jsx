import { useState } from "react";

const Question = () => {
  const [selectedStatus, setSelectedStatus] = useState("myself"); // Default selection
  const [selectedGender, setSelectedGender] = useState("male"); // Default selection
  const [questionData, setQuestionData] = useState({
    question: "",
    description: "",
    age: "",
    status: "myself",
    gender: "male",
  });

  const handleStatusChange = (type) => {
    setSelectedStatus(type);
    setQuestionData((prev) => ({ ...prev, status: type })); // Update questionData with selected status
  };

  const handleGenderChange = (gender) => {
    setSelectedGender(gender);
    setQuestionData((prev) => ({ ...prev, gender })); // Update questionData with selected gender
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setQuestionData((prev) => ({ ...prev, [name]: value })); // Dynamically update questionData
  };

  const handleAgeChange = (e) => {
    const value = Math.min(100, Math.max(0, Number(e.target.value))); // Clamp the value between 0 and 100
    setQuestionData((prev) => ({ ...prev, age: value })); // Update age in questionData
    e.target.value = value; // Update the input value
  };

  const handleSubmit = () => {
    console.log("Submitted Question Data:", questionData);
    // You can send questionData to an API or handle it as needed
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
            name="question"
            value={questionData.question}
            onChange={handleInputChange}
            className="bg-transparent border-primary border rounded-xl px-4 py-2 outline-none placeholder:text-primary/80"
            placeholder="Example: What are the causes of acne?"
          />
          <textarea
            name="description"
            value={questionData.description}
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
            type="number"
            name="age"
            value={questionData.age}
            onChange={handleAgeChange}
            className="bg-transparent border-primary border rounded-xl px-4 py-2 outline-none placeholder:text-primary/80"
            placeholder="Add Age"
            max={100}
          />
        </div>

        {/* Submit Button */}
        <div className="SubmitButton w-full mt-8">
          <button
            onClick={handleSubmit}
            className="bg-white text-primary/80 hover:text-tertiary hover:bg-primary font-semibold py-3 rounded-xl w-full transition-all duration-300"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Question;
