import Header from "./HeaderTypo";
import { Box, Button, TextField } from "@mui/material";
import { Field, Formik } from "formik";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { toast } from "react-toastify";
import Loader from "../Loader";

import { useParams } from "react-router-dom";
import { resetError } from "../../Store/Slices/offersSlice";
import { fetchDoctorById } from "../../Store/Slices/searchSlice";
import { resetUpdate, updatePassword } from "../../Store/Slices/userSlice";
import {
  answerQuestion,
  fetchAllQuestionsBySpeciality,
} from "../../Store/Slices/questionsSlice";

export default function AnswerQuestions() {
  const isNonMobile = useMediaQuery("(min-width:700px)");

  const {
    loading: loading2,
    error: error2,
    update,
  } = useSelector((state) => state.user);
  const { selectedDoctor, loading, error } = useSelector(
    (state) => state.search
  );
  const { specialization } = useSelector(
    (state) => state.search.selectedDoctor
  );
  const { selectedQuestions } = useSelector((state) => state.questions);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllQuestionsBySpeciality(specialization));
  }, []);

  const initialValues = {
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  };
  //   const handleFormSubmit = async (values) => {};
  //   const [answers, setAnswers] = useState({});

  const handleInputChange = (id, value) => {
    setAnswers((prev) => ({
      ...prev,
      [id]: value,
    }));
  };
  const [answers, setAnswers] = useState({});

  const handleSubmit = (e, id) => {
    e.preventDefault();
    const answer = answers[id];
    if (answer) {
      //   console.log(`Answer for question ${id}: ${answer}`);
      //   alert(`Answer submitted for question ${id}`);
      const data = {
        id: id,
        data: {
          answer: answer,
        },
      };
      //   console.log(data);
      dispatch(answerQuestion(data));
      //   setAnswers((prev) => ({
      //     ...prev,
      //     [id]: "",
      //   }));
    } else {
      toast.error("You havn't answered this question yet");
    }
  };
  return (
    <Box m="20px">
      <Header
        title={`${specialization} Questions`}
        subtitle="Answer questions related to your specialization"
      />
      {loading || loading2 ? (
        <Loader />
      ) : (
        <form>
          {
            <>
              <div className="p-6 bg-gray-900 min-h-screen text-white">
                <h1 className="text-2xl font-bold mb-4">
                  Answer {specialization} Questions
                </h1>
                <div className="space-y-6">
                  {selectedQuestions?.map((q) => (
                    <div
                      key={q.questionid}
                      className="bg-gray-800 p-4 rounded-lg shadow-md"
                    >
                      <h2 className="text-lg font-semibold mb-2">
                        {q.patientname} ({q.age} years, {q.gender})
                      </h2>
                      <p className="mb-4">
                        <strong>Question:</strong> {q.question}
                      </p>
                      <textarea
                        className="w-full p-2 bg-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none "
                        rows="3"
                        placeholder="Write your answer here..."
                        value={
                          q.answer ? q.answer : answers[q.questionid] || ""
                        }
                        onChange={(e) =>
                          handleInputChange(q.questionid, e.target.value)
                        }
                        disabled={q.answer}
                      >
                        {q.answer ? q.answer : ""}
                      </textarea>
                      <button
                        className={`mt-2 px-4 py-2 rounded-md text-white font-medium ${
                          q.answer
                            ? "bg-gray-600"
                            : " bg-blue-600 hover:bg-blue-700"
                        }`}
                        onClick={(e) => handleSubmit(e, q.questionid)}
                        disabled={q.answer}
                      >
                        {q.answer ? "Already answered" : "Submit Answer"}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </>
          }
        </form>
      )}
    </Box>
  );
}
