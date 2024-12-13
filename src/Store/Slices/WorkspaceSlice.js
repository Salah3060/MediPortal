import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllHospitals } from "../../API/workspaceApi";
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

const workspaceSlice = createSlice({
  name: "workspace",
  initialState: {
    Allhospitals: [],
    Allclinics: [],
    loading: false,
    error: "",
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
      }),
});
export default workspaceSlice.reducer;
