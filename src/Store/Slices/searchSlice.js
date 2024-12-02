import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAllDoctors,
  getDoctorById,
  getDoctorsBySpecialty,
} from "@/API/DoctorsApi";

// Async thunk to fetch all Doctors
export const fetchAllDoctors = createAsyncThunk(
  "doctors/fetchAllDoctors",
  async (_, thunkAPI) => {
    try {
      const doctors = await getAllDoctors();
      console.log(doctors);
      return doctors.data.doctors;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Async thunk to fetch doctors by specialty
export const fetchDoctorsBySpecialty = createAsyncThunk(
  "doctors/fetchDoctorsBySpecialty",
  async (specialty, thunkAPI) => {
    try {
      const doctors = await getDoctorsBySpecialty(specialty);
      return doctors.doctors;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Async thunk to fetch a single doctor
export const fetchDoctorById = createAsyncThunk(
  "doctors/fetchDoctorById",
  async (id, thunkAPI) => {
    try {
      const doctor = await getDoctorById(id);
      return doctor.doctors[0];
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

const searchSlice = createSlice({
  name: "search",
  initialState: {
    doctors: [],
    filteredDoctors: [],
    specialties: [],
    selectedDoctor: {},
    selectedSpecialty: "All Specialties",
    loading: false,
    error: null,
  },
  reducers: {
    setSelectedSpecialty: (state, action) => {
      state.selectedSpecialty = action.payload;
    },
    setFilteredDoctors: (state, action) => {
      state.filteredDoctors = action.payload;
    },
    setSelectedDoctor: (state, action) => {
      state.selectedDoctor = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      //Get Doctor by Specialty
      .addCase(fetchDoctorsBySpecialty.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDoctorsBySpecialty.fulfilled, (state, action) => {
        state.filteredDoctors = action.payload;
        state.loading = false;
      })
      .addCase(fetchDoctorsBySpecialty.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      //   Get Doctor by Id
      .addCase(fetchDoctorById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDoctorById.fulfilled, (state, action) => {
        state.selectedDoctor = action.payload;
        state.loading = false;
      })
      .addCase(fetchDoctorById.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      // Get all Doctors
      .addCase(fetchAllDoctors.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllDoctors.fulfilled, (state, action) => {
        state.doctors = action.payload;
        state.filteredDoctors = action.payload;
        state.loading = false;
      })
      .addCase(fetchAllDoctors.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export const { setSelectedSpecialty, setFilteredDoctors, setSelectedDoctor } =
  searchSlice.actions;

export default searchSlice.reducer;
