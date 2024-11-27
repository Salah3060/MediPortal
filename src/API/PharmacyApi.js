import axiosInstance from "./axiosInstance";

// get Single Product from id
export const getSingleProduct = async (id) => {
  try {
    const response = await axiosInstance.get(`/products/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data : error.message);
  }
};

// get Products form category id
export const getProductsByCategory = async (id) => {
  try {
    const response = await axiosInstance.get(`/products/category/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data : error.message);
  }
};

// get All categories
export const getAllCategories = async () => {
  try {
    const response = await axiosInstance.get("/categories");
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data : error.message);
  }
};
