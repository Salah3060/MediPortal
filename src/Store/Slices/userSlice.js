import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  firstname: "fda",
  lastname: "",
  phonenumber: "",
  email: "",
  gender: "",
  birthdate: "",
  wallet: "",
  bloodType: "",
  chronicDiseases: [],
  licenseNumber: "",
  exp: "",
  specialization: "",
  About: "",
};
const userSlice = createSlice({
  name: "user", // Name of the slice
  initialState, // Initial state defined earlier
  reducers: {
    loginRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload; // Payload contains user info
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload; // Payload contains the error
    },
    logout: (state) => {
      state.user = null;
    },
  },
});
export const { loginRequest, loginSuccess, loginFailure, logout } =
  userSlice.actions;
export default userSlice.reducer;
