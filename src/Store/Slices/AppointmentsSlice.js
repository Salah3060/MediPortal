import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { formatDate } from "../../Utils/functions.util";
import {
  ChangeAppointmentStatus,
  getAllDoctorAppointments,
  getDoctorStats,
} from "../../API/appointmentApi";
import { getDoctorPatients } from "../../API/DoctorsApi";
import { getPatientAppointments } from "../../API/patientApi";

export const fetchAllAppointments = createAsyncThunk(
  "Appointments/fetchAllAppointments",
  async (id, thunkAPI) => {
    try {
      const appointments = await getAllDoctorAppointments(id);
      return appointments.data.Appointments;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);
export const getAppointmentStats = createAsyncThunk(
  "Appointments/getAppointmentStats",
  async (id, thunkAPI) => {
    try {
      const stats = await getDoctorStats(id);
      return stats;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);
export const changeAppointment = createAsyncThunk(
  "Appointments/ChangeAppointmentStatus",
  async ({ id, status, docid }, thunkAPI) => {
    try {
      const promises = id.map(async (el) => {
        const response = await ChangeAppointmentStatus(el, status);
        response === "successful";
      });
      const results = await Promise.all(promises);
      const allSuccessful = results.every((result) => result === true);

      await thunkAPI.dispatch(fetchAllAppointments(docid));

      return allSuccessful;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);
export const cancelAppointment = createAsyncThunk(
  "Appointments/cancelAppointment",
  async (id, thunkAPI) => {
    try {
      const response = await ChangeAppointmentStatus(id, 0);
      return response.status === 200;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);
export const DoctorPatients = createAsyncThunk(
  "Appointments/DoctorPatients",
  async (id, thunkAPI) => {
    try {
      const patients = await getDoctorPatients(id);
      return patients;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);
export const fetchPatientAppointments = createAsyncThunk(
  "Appointments/fetchPatientAppointments",
  async (id, thunkAPI) => {
    try {
      const appointments = await getPatientAppointments(id);
      return appointments;
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
    stats: {},
    doctorPatients: [],
    PatientAppointments: [],
    appointmentCancelled: false,
  }, // Initialize state from cookies
  reducers: {
    resetCancelledStatus: (state) => {
      state.appointmentCancelled = false;
    },
    resetError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllAppointments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllAppointments.fulfilled, (state, action) => {
        const data = action.payload.map((el) => {
          return {
            ...el,
            name: el.patientfirstname + " " + el.patientlastname,
            id: el.appointmentid,
            bookingdate: formatDate(el.bookingdate),
            appointmentdate: formatDate(el.appointmentdate),
          };
        });
        state.Appointments = data;
        state.loading = false;
      })
      .addCase(fetchAllAppointments.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(changeAppointment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(changeAppointment.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(changeAppointment.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(getAppointmentStats.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAppointmentStats.fulfilled, (state, action) => {
        state.loading = false;
        state.stats = action.payload;
      })
      .addCase(getAppointmentStats.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(DoctorPatients.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(DoctorPatients.fulfilled, (state, action) => {
        state.loading = false;
        state.doctorPatients = action.payload;
      })
      .addCase(DoctorPatients.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(fetchPatientAppointments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPatientAppointments.fulfilled, (state, action) => {
        state.loading = false;
        state.PatientAppointments = action.payload.map((el, i) => {
          return {
            ...el,
            id: i + 1,
            doctorName: el.doctorfirstname + " " + el.doctorlastname,
            appointmentdate: formatDate(el.appointmentdate),
            bookingdate: formatDate(el.bookingdate),
          };
        });
      })
      .addCase(fetchPatientAppointments.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(cancelAppointment.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.appointmentCancelled = false;
      })
      .addCase(cancelAppointment.fulfilled, (state, action) => {
        state.loading = false;
        state.appointmentCancelled = action.payload;
      })
      .addCase(cancelAppointment.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
        state.appointmentCancelled = false;
      });
  },
});
export const { resetCancelledStatus, resetError } = AppointmentsSlice.actions;
export default AppointmentsSlice.reducer;
