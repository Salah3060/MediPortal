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

export const getOffersBySpecialty = async (specialty) => {
  try {
    const response = await axiosInstance.get(
      `/offers/allOffers?specialization=${specialty}`
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data : error.message);
  }
};
