import axiosInstance from "./axiosInstance";
import Cookies from "js-cookie";

// gat all doctors
export const getAllDoctors = async (page) => {
  try {
    const response = await axiosInstance.get(
      `/doctors/allDoctors?limit=10&&page=${page}`
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data : error.message);
  }
};

// get doctors by specialty
export const getDoctorsBySpecialty = async (specialty) => {
  try {
    const response = await axiosInstance.get(
      `/doctors/allDoctors?specialization=${specialty}`
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data : error.message);
  }
};

// get doctor by id
export const getDoctorById = async (id) => {
  try {
    const response = await axiosInstance.get(`/doctors/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data : error.message);
  }
};
export const getDoctorPatients = async (id) => {
  try {
    const response = await axiosInstance.get(`/doctors/patients/${id}`, {
      headers: { Authorization: `Bearer ${Cookies.get("token")}` },
    });
    return response.data.data.pateints;
  } catch (error) {
    throw new Error(error.response ? error.response.data : error.message);
  }
};
