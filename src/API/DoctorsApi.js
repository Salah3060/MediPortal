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
export const getDoctorsBySpecialty = async (specialty, page) => {
  try {
    console.log(page);
    const response = await axiosInstance.get(
      `/doctors/allDoctors?limit=10&&page=${page}&&specialization=${specialty}`
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data : error.message);
  }
};

// get All Specialties
export const getAllSpecialties = async () => {
  try {
    const response = await axiosInstance.get(`/doctors/allSpecializaions`);
    return response.data.data.specializations;
  } catch (error) {
    throw new Error(error.response ? error.response.data : error.message);
  }
};

// get all insurances
export const getAllInsurances = async () => {
  try {
    const response = await axiosInstance.get(`/insurances/allInsurances`);
    console.log(response.data.data.Insurances);
    return response.data.data.Insurances;
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
export const updateMe = async (data) => {
  try {
    const response = await axiosInstance.patch(`/doctors/updateMe`, data, {
      headers: { Authorization: `Bearer ${Cookies.get("token")}` },
    });

    return response.data.data.updatedUser;
  } catch (error) {
    throw new Error(error.response ? error.response.data : error.message);
  }
};