import axiosInstance from "./axiosInstance";
import Cookies from "js-cookie";

// book an appointment
export const bookAppointment = async (doctorId, worksapceId, data) => {
  try {
    console.log(data);

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

// create stripe session
export const createStripeSession = async (docId) => {
  try {
    const response = await axiosInstance.get(
      `/appointments/checkout-session/${docId}`,
      {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      }
    );
    console.log(response);
    return response;
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
    const response = await axiosInstance.patch(
      `/appointments/${id}`,
      {
        appointmentStatus: status === 1 ? "Completed" : "Cancelled",
      },
      {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      }
    );

    return response;
  } catch (error) {
    throw new Error(error.response ? error.response.data : error.message);
  }
};
export const getDoctorStats = async (id) => {
  try {
    const response = await axiosInstance.get(
      `/appointments/stats?a.doctorId=${id}`,
      {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      }
    );
    return response.data.data.stats;
  } catch (error) {
    throw new Error(error.response ? error.response.data : error.message);
  }
};
