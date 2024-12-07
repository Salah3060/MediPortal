import { useParams } from "react-router-dom";
import QuestionCard from "@/Components/Questions/Cards/QuestionCard";
import Loader from "@/Components/Loader"; // Assume you have a Loader component
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchAllQuestionsBySpeciality } from "@/Store/Slices/questionsSlice";

const QuestionsGroup = () => {
  const { speciality } = useParams();
  const dispatch = useDispatch();
  const { selectedQuestions, loading, error } = useSelector(
    (state) => state.questions
  );

  useEffect(() => {
    if (speciality) {
      dispatch(fetchAllQuestionsBySpeciality(speciality));
    }
  }, [dispatch, speciality]);

  return (
    <div className="w-full min-h-[645px] bg-gradient-to-r from-[#c2dfe3] to-[#9db4c0]">
      <div className="container max-w-[1300px] mx-auto flex flex-col gap-10 px-4 py-6">
        <div className="header flex flex-col gap-4 text-primary">
          <h2 className="text-3xl font-bold capitalize">{speciality}</h2>
          <p className="text-lg text-primary/60">
            All questions are answered by Verified MediPortal doctors
          </p>
        </div>

        {/* Loader */}
        {loading && (
          <div className="flex justify-center items-center min-h-[300px]">
            <Loader />
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="text-center text-red-500">
            <p>Failed to load questions. Please try again later.</p>
          </div>
        )}

        {/* Questions or Fallback */}
        {!loading && !error && (
          <>
            {Array.isArray(selectedQuestions) &&
            selectedQuestions.length > 0 ? (
              <div className="grid grid-cols-1 gap-4">
                {selectedQuestions.map((question, index) => (
                  <QuestionCard key={index} question={question} />
                ))}
              </div>
            ) : (
              <div className="text-center text-secondary">
                No questions available for this specialty.
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default QuestionsGroup;
