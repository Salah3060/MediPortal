import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { login } from "../../API/authAPI";
const initialState = {
  birthdate: "",
  createdAt: "",
  email: "",
  error: "",
  firstname: "",
  gender: "",
  lastname: "",
  loading: false,
  phonenumber: "",
  updatedAt: "",
  userId: 0,
  userRole: "",
  userState: "",
  wallet: "",
  status: "empty",
};
export const userLogin = createAsyncThunk(
  "user/login",
  async (payload, thunkAPI) => {
    try {
      const userData = await login(payload.email, payload.password);
      return userData.date.user;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);
const userSlice = createSlice({
  name: "user", // Name of the slice
  initialState, // Initial state defined earlier
  reducers: {
    clearUser: (state) => {
      state.status = "Empty";
      state.error = "";
      state.loading = "false";
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(userLogin.pending, (state) => {
        state.loading = true;
        state.status = "pending";
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.firstname = action.payload.firstname;
        state.lastname = action.payload.lastname;
        state.phonenumber = action.payload.phonenumber;
        state.email = action.payload.email;
        state.gender = action.payload.gender;
        state.birthdate = action.payload.birthdate;
        state.wallet = action.payload.wallet;
        state.bloodType = action.payload.bloodType;
        state.chronicDiseases = action.payload.chronicDiseases;
        state.licenseNumber = action.payload.licenseNumber;
        state.exp = action.payload.exp;
        state.specialization = action.payload.specialization;
        state.About = action.payload.About;
        state.createdAt = action.payload.createdat;
        state.exp = action.payload.exp;
        state.userRole = action.payload.userrole;
        state.updatedAt = action.payload.updatedat;
        state.userState = action.payload.userstate;
        state.error = "";
        state.loading = false;
        state.status = "success";
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
        state.status = "failed";
      }),
});
export const { clearUser } = userSlice.actions;
export default userSlice.reducer;
