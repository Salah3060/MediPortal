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
  updated: false,
  reviewed: false,
  userimg: null,
};
import { login, review, signUp } from "../../API/authAPI";
import {
  updateMe,
  updateMePatient,
  updatepassword,
} from "../../API/DoctorsApi";
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
      const userData = await signUp(payload);
      saveTokenToCookies(userData.token);
      return userData.date.user;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);
export const userReview = createAsyncThunk(
  "user/userReview",
  async ({ data, id }, thunkAPI) => {
    try {
      const response = await review(id, data);
      return response;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);
export const updateDoctor = createAsyncThunk(
  "user/updateDoctor",
  async (data, thunkAPI) => {
    try {
      const userData = await updateMe(data);
      return userData;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);
export const updatePatient = createAsyncThunk(
  "user/updatePatient",
  async (data, thunkAPI) => {
    try {
      const userData = await updateMePatient(data);
      return userData;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);
export const updatePassword = createAsyncThunk(
  "user/updatePassword",
  async (data, thunkAPI) => {
    try {
      const userData = await updatepassword(data);
      return userData;
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
      state.userRole = "";
    },
    logout: (state) => {
      state.status = "Empty";
      state.loading = "false";
      state.error = "";
      Cookies.remove("user");
      Cookies.remove("token");
    },
    resetError: (state) => {
      state.error = null;
    },
    resetUpdate: (state) => {
      state.update = false;
    },
    setUser: (state, userimg) => {
      console.log(userimg);

      state.userimg = userimg;
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
        state.birthdate = action.payload.birthdate.split("T")[0];
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
        state.userimg = action.payload.userimg;

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
        state.birthdate = action.payload.birthdate.split("T")[0];
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
        state.userimg = action.payload.userimg;

        saveUserToCookies(state);
      })
      .addCase(userSignup.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
        state.status = "failed";
        // resetUser
        saveUserToCookies(state);
      })
      .addCase(updateDoctor.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.update = false;
      })
      .addCase(updateDoctor.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
        state.update = true;
      })
      .addCase(updateDoctor.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.update = false;
      })
      .addCase(updatePassword.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.update = false;
      })
      .addCase(updatePassword.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
        state.update = true;
      })
      .addCase(updatePassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.update = false;
      })
      .addCase(updatePatient.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.update = false;
      })
      .addCase(updatePatient.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.update = true;
        state.firstname = action.payload.firstname;
        state.lastname = action.payload.lastname;
        state.phonenumber = action.payload.phonenumber;
        state.email = action.payload.email;
        state.gender = action.payload.gender;
        state.birthdate = action.payload.birthdate.split("T")[0];
        state.bloodType = action.payload.bloodType;
        state.licenseNumber = action.payload.licenseNumber;
        state.createdAt = action.payload.createdat;
        state.updatedAt = action.payload.updatedat;
        state.userState = action.payload.userstate;
        state.error = "";
        state.loading = false;
        state.status = "success";
        saveUserToCookies(state);
      })
      .addCase(updatePatient.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.update = false;
      })
      .addCase(userReview.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
        state.update = true;
        state.reviewed = true;
      })
      .addCase(userReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.update = false;
        state.reviewed = false;
      })
      .addCase(userReview.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.update = false;
      }),
});
export const { clearUser, logout, resetError, resetUpdate, setUser } =
  userSlice.actions;
export default userSlice.reducer;
