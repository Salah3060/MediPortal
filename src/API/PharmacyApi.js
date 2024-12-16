import axiosInstance from "./axiosInstance";
import Cookies from "js-cookie";

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
    const response = await axiosInstance.get("/products/allProducts", {
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data : error.message);
  }
};

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

// place order
export const placeOrder = async (order) => {
  try {
    const response = await axiosInstance.post("/orders", order, {
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data : error.message);
  }
};
