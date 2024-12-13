import axiosInstance from "./axiosInstance";

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

// export const getOffersBySpecialty = async (specialty) => {
//   try {
//     const response = await axiosInstance.get(
//       `/offers/allOffers?specialization=${specialty}`
//     );
//     return response.data;
//   } catch (error) {
//     throw new Error(error.response ? error.response.data : error.message);
//   }
// };

// export const getOffersById = async (id) => {
//   try {
//     const response = await axiosInstance.get(`/offers/allOffers?offerId=${id}`);
//     return response.data;
//   } catch (error) {
//     throw new Error(error.response ? error.response.data : error.message);
//   }
// };
