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
    const response = await axiosInstance.get(
      `/doctors/allDoctors?limit=10&&page=${page}&&specialization=${specialty}`
    );
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
export const updateMePatient = async (data) => {
  try {
    const response = await axiosInstance.patch(`/patients/updateMe`, data, {
      headers: { Authorization: `Bearer ${Cookies.get("token")}` },
    });

    return response.data.data.updatedUser;
  } catch (error) {
    throw new Error(error.response ? error.response.data : error.message);
  }
};
export const updatepassword = async (data) => {
  try {
    const response = await axiosInstance.patch(`/auth/updatePassword`, data, {
      headers: { Authorization: `Bearer ${Cookies.get("token")}` },
    });

    return response.status === 200;
  } catch (error) {
    throw new Error(error.response ? error.response.data : error.message);
  }
};
export const getDoctorReviews = async (id) => {
  try {
    const response = await axiosInstance.get(`/doctors/reviews/${id}`, {
      headers: { Authorization: `Bearer ${Cookies.get("token")}` },
    });
    return response.data.data.reviews;
  } catch (error) {

    throw new Error(error.response ? error.response.data : error.message);
  }
};
