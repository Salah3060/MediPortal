import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

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
  // userId: 0,
  userRole: "",
  userState: "",
  wallet: "",
  status: "empty",
  licenseNumber: "",
  specialization: "",
};
import { login, signUp } from "../../API/authAPI";
function loadUserFromCookies() {
  const savedUser = Cookies.get("user");
  return savedUser ? JSON.parse(savedUser) : initialState;
}
function saveUserToCookies(user) {
  Cookies.set("user", JSON.stringify(user), { expires: 7 });
}

function saveTokenToCookies(token) {
  Cookies.set("token", token, { expires: 7 });
}

export const userLogin = createAsyncThunk(
  "user/login",
  async (payload, thunkAPI) => {
    try {
      const userData = await login(payload.email, payload.password);
      saveTokenToCookies(userData.token);
      return userData.date.user;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);
export const userSignup = createAsyncThunk(
  "user/Signup",
  async (payload, thunkAPI) => {
    try {
      // console.log(payload);
      const userData = await signUp(payload);
      return userData.date.user;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);
const userSlice = createSlice({
  name: "user", // Name of the slice
  initialState: loadUserFromCookies(), // Initial state defined earlier
  reducers: {
    clearUser: (state) => {
      state.status = "Empty";
      state.error = "";
      state.loading = "false";
      saveUserToCookies(state);
    },
    logout: (state) => {
      state.status = "Empty";
      state.loading = "false";
      state.error = "";
      Cookies.remove("user");
      Cookies.remove("token");
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
        state.userid = action.payload.userid;
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
        saveUserToCookies(state);
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
        state.status = "failed";
        // resetUser
        saveUserToCookies(state);
      })
      .addCase(userSignup.pending, (state) => {
        state.loading = true;
        state.status = "pending";
      })
      .addCase(userSignup.fulfilled, (state, action) => {
        state.firstname = action.payload.firstname;
        state.lastname = action.payload.lastname;
        state.phonenumber = action.payload.phonenumber;
        state.userid = action.payload.userid;
        state.email = action.payload.email;
        state.gender = action.payload.gender;
        state.birthdate = action.payload.birthdate;
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
        saveUserToCookies(state);
      })
      .addCase(userSignup.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
        state.status = "failed";
        // resetUser
        saveUserToCookies(state);
      }),
});
export const { clearUser, logout } = userSlice.actions;
export default userSlice.reducer;
