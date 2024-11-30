import axios from "axios";

// Create an instance of Axios
const axiosInstance = axios.create({
  baseURL: "http://127.0.0.1:3000/", // Replace with your actual API base URL
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
