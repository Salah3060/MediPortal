import axiosInstance from "./axiosInstance";

// get Single Product from id
export const getSingleProduct = async (id) => {
  try {
    const response = await axiosInstance.get(
      `/products/allProducts?productId=${id}`
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data : error.message);
  }
};

//get All Products
export const getAllProducts = async () => {
  try {
    const response = await axiosInstance.get("/products/allProducts");
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data : error.message);
  }
}

// get Products form category id
export const getProductsByCategory = async (catName) => {
  try {
    const response = await axiosInstance.get(
      `/products/allProducts?categoryName=${catName}`
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data : error.message);
  }
};

// get All categories
export const getAllCategories = async () => {
  try {
    const response = await axiosInstance.get("/categories/allCategories");
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data : error.message);
  }
};
