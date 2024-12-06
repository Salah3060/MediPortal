import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllOffers, getOffersBySpecialty } from "@/API/offersApi";

// Async thunk to fetch all offers
export const fetchAllOffers = createAsyncThunk(
  "offers/fetchAllOffers",
  async (_, thunkAPI) => {
    try {
      const offers = await getAllOffers();
      return offers.data.offers;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Async thunk to fetch offers by specialty
export const fetchOffersBySpecialty = createAsyncThunk(
  "offers/fetchOffersBySpecialty",
  async (specialty, thunkAPI) => {
    try {
      const offers = await getOffersBySpecialty(specialty);
      return offers.offers;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

const offersSlice = createSlice({
  name: "offers",
  initialState: {
    offers: [],
    specialties: [],
    selectedOffer: {},
    selectedSpecialty: "All Specialties",
    loading: false,
    error: null,
  },
  reducers: {
    setSelectedSpecialty: (state, action) => {
      state.selectedSpecialty = action.payload;
    },
    setSelectedOffer: (state, action) => {
      state.selectedOffer = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      //Get Doctor by Specialty
      .addCase(fetchOffersBySpecialty.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOffersBySpecialty.fulfilled, (state, action) => {
        state.filteredDoctors = action.payload;
        state.loading = false;
      })
      .addCase(fetchOffersBySpecialty.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      // .addCase(fetchDoctorById.pending, (state) => {
      //   state.loading = true;
      //   state.error = null;
      // })
      // .addCase(fetchDoctorById.fulfilled, (state, action) => {
      //   state.selectedDoctor = action.payload;
      //   state.loading = false;
      // })
      // .addCase(fetchDoctorById.rejected, (state, action) => {
      //   state.error = action.payload;
      //   state.loading = false;
      // })
      .addCase(fetchAllOffers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllOffers.fulfilled, (state, action) => {
        state.doctors = action.payload;
        state.filteredDoctors = action.payload;
        state.loading = false;
      })
      .addCase(fetchAllOffers.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export const { setSelectedSpecialty, setFilteredDoctors, setSelectedDoctor } =
  offersSlice.actions;

export default offersSlice.reducer;
