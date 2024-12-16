import axiosInstance from "./axiosInstance";
import Cookies from "js-cookie";
// get all offers
export const getAllHospitals = async () => {
  try {
    const response = await axiosInstance.get(
      "/workspace/allWorkSpaces?w.workspaceType=Hospital"
    );

    return response.data.data.workSpaces;
  } catch (error) {
    console.error(error);
  }
};

export const createclinic = async (data) => {
  try {
    const response = await axiosInstance.post("/workspace", data, {
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    });
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const getDoctorworkSpaces = async (id) => {
  try {
    const response = await axiosInstance.get(`/doctors/workspaces/${id}`, {
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    });
    return response;
  } catch (error) {
    console.error(error);
  }
};
