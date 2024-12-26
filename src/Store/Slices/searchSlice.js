import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAllDoctors,
  getDoctorById,
  getDoctorsBySpecialty,
  getAllSpecialties,
  getAllInsurances,
} from "@/API/DoctorsApi";
import { getDoctorReviews } from "../../API/DoctorsApi";

// Async thunk to fetch all Doctors
export const fetchAllDoctors = createAsyncThunk(
  "doctors/fetchAllDoctors",
  async (page, thunkAPI) => {
    try {
      const doctors = await getAllDoctors(page);
      return doctors.data.doctors;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);
export const fetchDoctorReviews = createAsyncThunk(
  "doctors/fetchDoctorReviews",
  async (id, thunkAPI) => {
    try {
      const reviews = await getDoctorReviews(id);
      return reviews;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Async thunk to fetch all specialties
export const fetchAllSpecialties = createAsyncThunk(
  "doctors/fetchAllSpecialties",
  async (_, thunkAPI) => {
    try {
      const specialties = await getAllSpecialties();
      return specialties.data.specializations;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Async thunk to fetch all insurances
export const fetchAllInsurances = createAsyncThunk(
  "doctors/fetchAllInsurances",
  async (_, thunkAPI) => {
    try {
      const insurances = await getAllInsurances();
      return insurances.data.insurances;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Async thunk to fetch doctors by specialty
export const fetchDoctorsBySpecialty = createAsyncThunk(
  "doctors/fetchDoctorsBySpecialty",
  async ({ specialty, page }, thunkAPI) => {
    try {
      const doctors = await getDoctorsBySpecialty(specialty, page);
      return doctors.data.doctors;
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

      return doctor.data.doctor[0];
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
    insurances: [],
    selectedDoctor: {},
    page: 1,
    selectedSpecialty: "All Specialties",
    selectedInsurance: "All Insurances",
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
    setSpecialties: (state, action) => {
      state.specialties = action.payload;
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setInsurances: (state, action) => {
      state.insurances = action.payload;
    },
    setSelectedInsurance: (state, action) => {
      state.selectedInsurance = action.payload;
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
        state.selectedDoctor.gender = action.payload.gender.toLowerCase();
        state.loading = false;
        const rv = action.payload.reviews?.filter((el) => el.rate !== null);
        const uniqueReviews = Array.from(
          new Set(rv?.map((review) => JSON.stringify(review)))
        ).map((json) => JSON.parse(json));
        state.selectedDoctor.reviews = uniqueReviews;
        const av = action.payload.availibility?.filter(
          (el) => el.rate !== null
        );
        const uniqueAvailibilities = Array.from(
          new Set(av?.map((avail) => JSON.stringify(avail)))
        ).map((json) => JSON.parse(json));
        state.selectedDoctor.availibility = uniqueAvailibilities;
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
      })
      // Get all Specialties
      .addCase(fetchAllSpecialties.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllSpecialties.fulfilled, (state, action) => {
        state.specialties = action.payload;
        state.loading = false;
      })
      .addCase(fetchAllSpecialties.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(fetchDoctorReviews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDoctorReviews.fulfilled, (state, action) => {
        state.reviews = action.payload;
        state.loading = false;
      })
      .addCase(fetchDoctorReviews.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export const {
  setSelectedSpecialty,
  setFilteredDoctors,
  setSelectedDoctor,
  setSpecialties,
  setPage,
  setInsurances,
  setSelectedInsurance,
} = searchSlice.actions;

export default searchSlice.reducer;
