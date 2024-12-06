import axiosInstance from "./axiosInstance";

// get all offers
export const getAllOffers = async () => {
  try {
    const response = await axiosInstance.get("/offers/allOffers");
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
