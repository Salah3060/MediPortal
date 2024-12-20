import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  changePassword,
  CheckVerificattionCode,
  getVerificationCode,
} from "../../API/resetPasswordApi";

export const ChangePass = createAsyncThunk(
  "resetPassword/ChangePass",
  async (data, thunkAPI) => {
    try {
      const resp = await changePassword(data);
      return resp;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);
export const CheckVeri = createAsyncThunk(
  "resetPassword/CheckVeri",
  async (data, thunkAPI) => {
    try {
      const resp = await CheckVerificattionCode(data);
      return resp;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);
export const SendVerificationCode = createAsyncThunk(
  "resetPassword/SendVerificationCode",
  async (email, thunkAPI) => {
    try {
      const resp = await getVerificationCode(email);
      return resp;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

const ResetPassword = createSlice({
  name: "resetPassword",
  initialState: {
    loading: false,
    error: "",
    step: 1,
    success: false,
  },
  reducers: {
    resetError: (state) => {
      state.error = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(SendVerificationCode.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(SendVerificationCode.fulfilled, (state, action) => {
        //   state.offers = action.payload;
        state.loading = false;
        if (action.payload) state.step = 2;
      })
      .addCase(SendVerificationCode.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(ChangePass.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(ChangePass.fulfilled, (state, action) => {
        //   state.offers = action.payload;
        state.loading = false;
        if (action.payload) {
          state.step = 3;
          state.success = true;
        }
      })
      .addCase(ChangePass.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(CheckVeri.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(CheckVeri.fulfilled, (state, action) => {
        //   state.offers = action.payload;
        state.loading = false;
        if (action.payload) state.step = 3;
      })
      .addCase(CheckVeri.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
    //       .addCase(getOfferById.pending, (state) => {
    //         state.loading = true;
    //         state.error = null;
    //       })
    //       .addCase(getOfferById.fulfilled, (state, action) => {
    //         state.selectedOffer = action.payload.offer;
    //         state.selectedDoctor = action.payload.doctor;
    //         state.loading = false;
    //       })
    //       .addCase(getOfferById.rejected, (state, action) => {
    //         state.error = action.payload;
    //         state.loading = false;
    //       })
    //       .addCase(DoctorOffer.pending, (state) => {
    //         state.loading = true;
    //         state.error = null;
    //       })
    //       .addCase(DoctorOffer.fulfilled, (state, action) => {
    //         state.loading = false;
    //         state.doctorOffers = action.payload.map((el) => ({
    //           ...el,
    //           startdate: formatDate(el.startdate),
    //           enddate: formatDate(el.enddate),
    //         }));
    //       })
    //       .addCase(DoctorOffer.rejected, (state, action) => {
    //         state.error = action.payload;
    //         state.loading = false;
    //       })
    //       .addCase(AddOffer.pending, (state) => {
    //         state.loading = true;
    //         state.error = null;
    //       })
    //       .addCase(AddOffer.fulfilled, (state) => {
    //         state.loading = false;
    //         state.added = true;
    //       })
    //       .addCase(AddOffer.rejected, (state, action) => {
    //         state.error = action.payload;
    //         state.loading = false;
    //       })
    //       .addCase(UpdateOffer.pending, (state) => {
    //         state.loading = true;
    //         state.error = null;
    //       })
    //       .addCase(UpdateOffer.fulfilled, (state) => {
    //         state.loading = false;
    //         state.updated = true;
    //       })
    //       .addCase(UpdateOffer.rejected, (state, action) => {
    //         state.error = action.payload;
    //         state.loading = false;
    //       });
    // },
  },
});

export const {} = ResetPassword.actions;

export default ResetPassword.reducer;
