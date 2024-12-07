import axiosInstance from "./axiosInstance";
import Cookies from "js-cookie";

// get all questions
export const getAllQuestions = async () => {
  try {
    const response = await axiosInstance.get(`/questions/allQuestions`);
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data : error.message);
  }
};

// get all questions by speciality
export const getAllQuestionsBySpeciality = async (speciality) => {
  try {
    const response = await axiosInstance.get(
      `/questions/allQuestions?speciality=${speciality}`
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data : error.message);
  }
};

// get question by patientId
export const getQuestionByPatientId = async (patientId) => {
  try {
    const response = await axiosInstance.get(
      `/questions/allQuestions?patientId=${patientId}`
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data : error.message);
  }
};

// ask a question
export const askQuestion = async (questionData) => {
  try {
    const response = await axiosInstance.post(`/questions/`, questionData, {
      headers: {
        "Content-Type": "application/json",
        // token
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data : error.message);
  }
};
