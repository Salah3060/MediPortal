import axiosInstance from "./axiosInstance";

export const upload = async (data) => {
  try {
    data.forEach((value, key) => {
      console.log(key, value);
    });

    const response = await axiosInstance.post("/auth/editPhoto", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    console.log("Upload successful:", response);
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
