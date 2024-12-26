import Axios from "axios";
import Cookies from "js-cookie";
export const upload = async (data) => {
  try {
    const response = await Axios.patch(
      `https://mediportal-api-production.up.railway.app/api/v1/patients/updateMe`,
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      "An unknown error occurred";
    console.error("Upload failed:", errorMessage);
    throw new Error(errorMessage);
  }
};
export const uploadDoctor = async (data) => {
  try {
    const response = await Axios.patch(
      `https://mediportal-api-production.up.railway.app/api/v1/doctors/updateMe`,
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      "An unknown error occurred";
    console.error("Upload failed:", errorMessage);
    throw new Error(errorMessage);
  }
};
