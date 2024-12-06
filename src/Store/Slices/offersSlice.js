import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllOffers } from "@/API/OffersApi";
import { getOffersById } from "../../API/offersApi";

// Async thunk to fetch all offers
export const fetchAllOffers = createAsyncThunk(
  "offers/fetchAllOffers",
  async (_, thunkAPI) => {
    try {
      const offers = await getAllOffers();
      console.log(offers.data.offers);
      return offers.data.offers;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const getOfferById = createAsyncThunk(
  "offers/getOfferById",
  async (id, thunkAPI) => {
    try {
      const offers = await getOffersById(id);
      return offers.data.offers[0];
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

const offersSlice = createSlice({
  name: "offers",
  initialState: {
    offers: [],
    selectedOffer: null,
    loading: false,
    error: null,
  },
  reducers: {
    setSelectedOffer: (state, action) => {
      state.selectedOffer = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllOffers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllOffers.fulfilled, (state, action) => {
        state.offers = action.payload;
        state.loading = false;
      })
      .addCase(fetchAllOffers.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(getOfferById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOfferById.fulfilled, (state, action) => {
        state.selectedOffer = action.payload;
        state.loading = false;
      })
      .addCase(getOfferById.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export const { setSelectedOffer } = offersSlice.actions;

export default offersSlice.reducer;
