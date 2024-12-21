import axiosInstance from "./axiosInstance";

export const getVerificationCode = async (email) => {
  try {
    const response = await axiosInstance.get(`/auth/forgetPassword/${email}`);
    return response.status === 200;
  } catch (error) {
    throw new Error(error.response ? error.response.data : error.message);
  }
};
export const changePassword = async ({ data, email }) => {
  try {
    const response = await axiosInstance.post(
      `/auth/resetPassword/${email}`,
      data
    );
    return response.status === 200;
  } catch (error) {
    throw new Error(error.response ? error.response.data : error.message);
  }
};
export const CheckVerificattionCode = async ({ data, email }) => {
  try {
    const response = await axiosInstance.post(
      `/auth/checkVerificationCode/${email}`,
      data
    );
    return response.status === 200;
  } catch (error) {
    throw new Error(error.response ? error.response.data : error.message);
  }
};
