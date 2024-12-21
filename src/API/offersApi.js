import axiosInstance from "./axiosInstance";
import Cookies from "js-cookie";

// get all offers
export const getAllOffers = async () => {
  try {
    const response = await axiosInstance.get("/offers/allOffers");
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getDoctorOffer = async (id) => {
  try {
    const response = await axiosInstance.get(
      `/offers/allOffers?doctorId=${id}`,
      {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      }
    );

    return response.data.data.offers;
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

export const getOffersById = async (id) => {
  try {
    const response = await axiosInstance.get(`/offers/allOffers?offerId=${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data : error.message);
  }
};
export const addOffer = async (id, data) => {
  try {
    data.percentage = data.percentage.toString();

    const response = await axiosInstance.post(`/offers/${+id}`, data, {
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data : error.message);
  }
};
export const updateOffer = async (id, data) => {
  try {
    data.percentage = data.percentage.toString();
    const response = await axiosInstance.patch(`/offers/${+id}`, data, {
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data : error.message);
  }
};
