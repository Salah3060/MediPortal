import axios from "axios";

// Create an instance of Axios
const axiosInstance = axios.create({
  baseURL: "https://mediportal-api-production.up.railway.app/api/v1/", // Replace with your actual API base URL
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
