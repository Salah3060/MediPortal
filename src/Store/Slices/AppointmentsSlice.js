import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  ChangeAppointmentStatus,
  getAllDoctorAppointments,
} from "../../API/appointmentApi";

export const fetchAllAppointments = createAsyncThunk(
  "Appointments/fetchAllAppointments",
  async (id, thunkAPI) => {
    try {
      const appointments = await getAllDoctorAppointments(id);
      console.log(appointments);
      return appointments.data.Appointments;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);
export const changeAppointment = createAsyncThunk(
  "Appointments/ChangeAppointmentStatus",
  async (id, status, thunkAPI) => {
    try {
      const response = await ChangeAppointmentStatus(id, status);
      return response.status === "successful";
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);
const AppointmentsSlice = createSlice({
  name: "Appointments",
  initialState: {
    Appointments: [],
    loading: false,
    error: "",
  }, // Initialize state from cookies
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllAppointments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllAppointments.fulfilled, (state, action) => {
        const data = action.payload.map((el) => {
          ({
            id: el.appointmentid,
            ...el,
          });
        });
        state.Appointments = data;
        state.loading = false;
      })
      .addCase(fetchAllAppointments.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export default AppointmentsSlice.reducer;
