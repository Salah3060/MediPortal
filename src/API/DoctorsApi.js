import axiosInstance from "./axiosInstance";

// gat all doctors
export const getAllDoctors = async () => {
  try {
    const response = await axiosInstance.get("/doctors/allDoctors");
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
    const response = await axiosInstance.get(`/doctors/allDoctors/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data : error.message);
  }
};
