import axiosInstance from "./axiosInstance";

// book an appointment
export const bookAppointment = async (doctorId, worksapceId, data) => {
  try {
    const response = await axiosInstance.post(
      `/appointments/${doctorId}/${worksapceId}`,
      data
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data : error.message);
  }
};

// get all appointments
export const getAllAppointments = async (patientId) => {
  try {
    const response = await axiosInstance.get(`/appointments/${patientId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data : error.message);
  }
};
