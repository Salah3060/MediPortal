import propTypes from "prop-types";
import { formatDate } from "@/Utils/functions.util";

const QuestionCard = ({ question }) => {
  return (
    <div className="flex flex-col bg-white px-4 py-4 rounded-xl gap-4 shadow-sm">
      {/* Question Header */}
      <div className="text-primary/90 text-sm sm:text-base">
        {question.age} year old {question.gender} asked
      </div>

      {/* Question Title */}
      <h1 className="text-lg sm:text-xl font-semibold text-primary">
        {question.question}
      </h1>

      {/* Doctor Details */}
      <div className="doctor flex flex-col sm:flex-row items-center gap-4 mt-2">
        <div className="image flex-shrink-0">
          <img
            src={"https://i.pravatar.cc/300"}
            alt={question.doctorname}
            className="w-14 h-14 rounded-full object-cover"
          />
        </div>
        <div className="text flex flex-col text-center sm:text-left">
          <h1 className="text-base sm:text-lg font-semibold text-darkRed">
            {question.doctorname}
          </h1>
          <p className="text-sm sm:text-base text-darkRed/60">
            {question.speciality}
          </p>
        </div>
      </div>

      {/* Question Answer */}
      <p className="text-sm sm:text-base mt-2">
        {question.answer ? question.answer : "Not Answered Yet"}
      </p>

      {/* Question Date */}
      <div className="date text-sm text-primary/60 text-right">
        {formatDate(question.questiondate)}
      </div>
    </div>
  );
};

QuestionCard.propTypes = {
  question: propTypes.object.isRequired,
};

export default QuestionCard;
