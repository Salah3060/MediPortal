import { useSelector, useDispatch } from "react-redux";
import { fetchAllQuestions } from "@/Store/Slices/questionsSlice";
import { useEffect, useState } from "react";
import QuestionCategoryCard from "@/Components/Questions/Cards/QuestionCategoryCard";
import Loader from "@/Components/Loader";

const QuestionsCats = () => {
  const dispatch = useDispatch();
  const [specialties, setSpecialties] = useState([]);
  const { questions, loading, error } = useSelector((state) => state.questions);

  useEffect(() => {
    dispatch(fetchAllQuestions());
  }, [dispatch]);

  useEffect(() => {
    if (questions) {
      const specialities = questions.map((question) => question.speciality);
      const uniqueSpecialities = [...new Set(specialities)];
      setSpecialties(uniqueSpecialities);
    }
  }, [questions]);

  if (loading) {
    return (
      <div className="w-full min-h-[645px] flex justify-center items-center">
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full min-h-[645px] flex justify-center items-center text-red-500 text-lg">
        <p>
          Error: {error.message || "Something went wrong. Please try again."}
        </p>
      </div>
    );
  }

  return (
    <div className="w-full min-h-[645px]">
      <div className="container max-w-screen-xl mx-auto flex flex-col gap-10 px-4 py-6">
        <div className="header flex flex-col gap-4 text-primary">
          <h1 className="text-2xl sm:text-3xl font-bold">Medical Answers</h1>
          <p className="text-secondary sm:text-lg">
            All the answers published on this website are written by Verified
            medical doctors, therapists, and health experts.
          </p>
          <h1 className="text-xl sm:text-2xl font-semibold">Popular Topics</h1>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {specialties.map((specialty, index) => (
            <QuestionCategoryCard key={index} specialty={specialty} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuestionsCats;
