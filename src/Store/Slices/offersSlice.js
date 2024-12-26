import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  addOffer,
  getAllOffers,
  getDoctorOffer,
  getOffersById,
  updateOffer,
} from "../../API/offerApi";
import { getDoctorById } from "@/API/DoctorsApi";
import { formatDate } from "../../Utils/functions.util";

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

export const getOfferById = createAsyncThunk(
  "offers/getOfferById",
  async (id, thunkAPI) => {
    try {
      const offers = await getOffersById(id);
      const doctor = await getDoctorById(offers.data.offers[0].doctorid);
      return { offer: offers.data.offers[0], doctor: doctor.data.doctor[0] };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);
export const DoctorOffer = createAsyncThunk(
  "offers/DoctorOffer",
  async (id, thunkAPI) => {
    try {
      const data = await getDoctorOffer(id);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);
export const AddOffer = createAsyncThunk(
  "offers/AddOffer",
  async ({ data, id }, thunkAPI) => {
    try {
      const resp = await addOffer(id, data);
      return resp;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);
export const UpdateOffer = createAsyncThunk(
  "offers/UpdateOffer",
  async ({ data, id }, thunkAPI) => {
    try {
      const resp = await updateOffer(id, data);

      return resp.data.updatedOffer;
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
    selectedDoctor: null,
    loading: false,
    error: null,
    doctorOffers: [],
    added: false,
    updated: false,
  },
  reducers: {
    setSelectedOffer: (state, action) => {
      state.selectedOffer = action.payload;
    },
    resetAdded: (state) => {
      state.added = false;
    },
    resetUpdated: (state) => {
      state.updated = false;
    },
    resetError: (state) => {
      state.error = false;
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
        state.selectedOffer = action.payload.offer;
        // state.selectedDoctor = action.payload.doctor;
        // state.selectedDoctor = action.payload.doctor.availibility;
        state.selectedDoctor = structuredClone(action.payload.doctor);
        // state.selectedDoctor.availibility = {
        //   ...action.payload.doctor.availibility,
        // };
        const rv = action.payload.doctor.reviews?.filter(
          (el) => el.rate !== null
        );
        const Av = action.payload.doctor.availibility?.filter(
          (el) => el.locationId !== null
        );
        const uniqueReviews = Array.from(
          new Set(rv?.map((review) => JSON.stringify(review)))
        ).map((json) => JSON.parse(json));

        const uniqueAvs = Array.from(
          new Set(Av?.map((review) => JSON.stringify(review)))
        ).map((json) => JSON.parse(json));

        state.selectedDoctor.reviews = uniqueReviews;
        state.selectedDoctor.availibility = uniqueAvs;

        state.loading = false;
      })
      .addCase(getOfferById.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(DoctorOffer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(DoctorOffer.fulfilled, (state, action) => {
        state.loading = false;
        state.doctorOffers = action.payload.map((el) => ({
          ...el,
          startDate: el.startdate,
          endDate: el.enddate,
          startdate: formatDate(el.startdate),
          enddate: formatDate(el.enddate),
        }));
      })
      .addCase(DoctorOffer.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(AddOffer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(AddOffer.fulfilled, (state) => {
        state.loading = false;
        state.added = true;
      })
      .addCase(AddOffer.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(UpdateOffer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(UpdateOffer.fulfilled, (state, action) => {
        state.loading = false;
        state.updated = true;

        const ofr = state.doctorOffers.find(
          (el) => el.offerid === action.payload.offerid
        );
        ofr.endDate = action.payload.enddate;
        ofr.offerdescription = action.payload.offerdescription;
        ofr.offername = action.payload.offername;
        ofr.percentage = action.payload.percentage;
        ofr.startDate = action.payload.startdate;
      })
      .addCase(UpdateOffer.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export const { setSelectedOffer, resetAdded, resetUpdated, resetError } =
  offersSlice.actions;

export default offersSlice.reducer;
