import axiosInstance from "./axiosInstance";
import Cookies from "js-cookie";

// get all patients
export const getAllPatients = async () => {
  try {
    const response = await axiosInstance.get(`/patients/allPatients`);
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data : error.message);
  }
};

// get a single patient
export const getPatient = async (id) => {
  try {
    const response = await axiosInstance.get(`/patints/alPatints?userId=${id}`);
    return response.data.data.patients[0];
  } catch (error) {
    throw new Error(error.response ? error.response.data : error.message);
  }
};

export const getPatientAppointments = async (id) => {
  try {
    const response = await axiosInstance.get(
      `/appointments/allAppointments?a.patientId=${id}`,
      {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      }
    );
    return response.data.data.Appointments;
  } catch (error) {
    throw new Error(error.response ? error.response.data : error.message);
  }
};
