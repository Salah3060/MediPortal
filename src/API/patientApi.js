import axiosInstance from "./axiosInstance";

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
    console.log(response.data.data.patients[0]);
    return response.data.data.patients[0];
  } catch (error) {
    throw new Error(error.response ? error.response.data : error.message);
  }
};
