import axiosInstance from "./axiosInstance";
import Cookies from "js-cookie";

// book an appointment
export const bookAppointment = async (doctorId, worksapceId, data) => {
  try {
    const response = await axiosInstance.post(
      `/appointments/${doctorId}/${worksapceId}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      }
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

export const getAllDoctorAppointments = async (doctorId) => {
  try {
    const response = await axiosInstance.get(
      `/appointments/allAppointments?a.doctorId=${doctorId}`,
      {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data : error.message);
  }
};
export const ChangeAppointmentStatus = async (id, status) => {
  try {
    const response = await axiosInstance.patch(`/appointments/${id}`, {
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
      body: {
        appointmentStatus: status ? "Successful" : "Cancelled",
      },
    });
    return response;
  } catch (error) {
    throw new Error(error.response ? error.response.data : error.message);
  }
};
