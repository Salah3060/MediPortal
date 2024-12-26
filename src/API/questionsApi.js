import axiosInstance from "./axiosInstance";
import Cookies from "js-cookie";

// get all questions
export const getAllQuestions = async () => {
  try {
    const response = await axiosInstance.get(`/questions/allQuestions`, {
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data : error.message);
  }
};

// get all questions by speciality
export const getAllQuestionsBySpeciality = async (speciality) => {
  try {
    const response = await axiosInstance.get(
      `/questions/allQuestions?speciality=${speciality}`,
      {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      }
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
      `/questions/allQuestions?patientId=${patientId}`,
      {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      }
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
export const answerQ = async (id, data) => {
  try {
    const response = await axiosInstance.patch(
      `/questions/answer/${id}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      }
    );
    response;

    return response.data.data.answerRes;
  } catch (error) {
    throw new Error(error.response ? error.response.data : error.message);
  }
};
