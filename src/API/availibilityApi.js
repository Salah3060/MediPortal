import axiosInstance from "./axiosInstance";
import Cookies from "js-cookie";
// get all offers
export const AddAvailibility = async (data, id) => {
  try {
    const response = await axiosInstance.post(
      `/doctors/availability/${id}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      }
    );

    return response.status === 200
      ? Promise.resolve(1)
      : Promise.reject(new Error(0));
  } catch (error) {
    return Promise.reject(new Error(error));
  }
};
export const CancelAv = async (data, id) => {
  try {
    const response = await axiosInstance.delete(`/doctors/availability/${id}`, {
      data,
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    });

    return response.status === 200
      ? Promise.resolve(1)
      : Promise.reject(new Error(0));
  } catch (error) {
    return Promise.reject(new Error(error));
  }
};
