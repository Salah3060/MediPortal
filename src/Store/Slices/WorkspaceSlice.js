import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createclinic,
  getAllHospitals,
  getDoctorworkSpaces,
} from "../../API/workspaceApi";
import { AddAvailibility, CancelAv } from "../../API/availibilityApi";
export const fetchAllhospitals = createAsyncThunk(
  "workspace/getAllhospitals",
  async (_, thunkAPI) => {
    try {
      const hospitals = await getAllHospitals();
      return hospitals;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);
export const fetchDoctorworkspaces = createAsyncThunk(
  "workspace/fetchDoctorworkspaces",
  async (id, thunkAPI) => {
    try {
      const response = await getDoctorworkSpaces(id);

      return response.data.data.workspaces;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);
export const addAvailibility = createAsyncThunk(
  "workspace/addAvailibility",
  async ({ data, id }, thunkAPI) => {
    try {
      const promises = await data.map(async (el) => {
        const x = await AddAvailibility(el, id);
        return x;
      });
      const results = await Promise.all(promises);

      return results;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);
export const cancelAvailibility = createAsyncThunk(
  "workspace/cancelAvailibility",
  async (data, thunkAPI) => {
    try {
      const promises = await data.map(async (el) => {
        const x = await CancelAv(el.data, el.id);
        return x;
      });
      const results = await Promise.all(promises);

      return results;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const createClinic = createAsyncThunk(
  "workspace/createClinic",
  async (data, thunkAPI) => {
    try {
      const response = await createclinic(data);

      return response.data.data.workspace;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);
const workspaceSlice = createSlice({
  name: "workspace",
  initialState: {
    Allhospitals: [],
    Allclinics: [],
    loading: false,
    error: "",
    updated: false,
    errorUpdate: "",
    newClinic: {},
    selectedDoctorWorkspaces: [],
  },
  reducers: {
    resetUpdateState: (state) => {
      state.updated = false;
    },
    resetErrorState(state) {
      state.error = null;
    },
    // resetUError(state)
  },
  extraReducers: (builder) =>
    builder
      .addCase(fetchAllhospitals.fulfilled, (state, action) => {
        state.Allhospitals = action.payload;
        state.loading = false;
      })
      .addCase(fetchAllhospitals.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllhospitals.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addAvailibility.fulfilled, (state) => {
        state.loading = false;
        state.updated = true;
        state.error = "";
      })
      .addCase(addAvailibility.pending, (state) => {
        state.loading = true;
        state.updated = false;
        state.error = "";
      })
      .addCase(addAvailibility.rejected, (state, action) => {
        state.updated = false;
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createClinic.fulfilled, (state, action) => {
        state.loading = false;
        state.error = "";
        state.newClinic = action.payload;
      })
      .addCase(createClinic.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(createClinic.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(cancelAvailibility.fulfilled, (state) => {
        state.loading = false;
        state.updated = true;
        state.error = null;
      })
      .addCase(cancelAvailibility.pending, (state) => {
        state.loading = true;
        state.updated = false;
        state.error = null;
      })
      .addCase(cancelAvailibility.rejected, (state, action) => {
        state.updated = false;
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchDoctorworkspaces.fulfilled, (state, action) => {
        state.loading = false;
        state.error = "";
        const data = action.payload;
        const uniqueWorkspaces = [
          ...new Map(data.map((item) => [item.workspaceid, item])).values(),
        ];
        state.selectedDoctorWorkspaces = uniqueWorkspaces;
      })
      .addCase(fetchDoctorworkspaces.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(fetchDoctorworkspaces.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      }),
});
export default workspaceSlice.reducer;
export const { resetUpdateState, resetErrorState } = workspaceSlice.actions;
