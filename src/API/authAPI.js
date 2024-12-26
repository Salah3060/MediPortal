import axiosInstance from "./axiosInstance";
import Cookies from "js-cookie";

// Login user
export const login = async (email, password) => {
  try {
    const response = await axiosInstance.post("/auth/logIn", {
      email,
      password,
    });

    return response.data;
  } catch (error) {
    throw new Error(
      error.response ? error.response.data.message : error.message
    );
  }
};

export const signUp = async (user) => {
  try {
    const response = await axiosInstance.post("/auth/register", user);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response ? error.response.data.message : error.message
    );
  }
};
export const review = async (id, data) => {
  try {
    const response = await axiosInstance.post(`/reviews/${id}`, data, {
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    });
    return response.status === 200;
  } catch (error) {
    throw new Error(
      error.response ? error.response.data.message : error.message
    );
  }
};
