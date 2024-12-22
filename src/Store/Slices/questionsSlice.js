import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAllQuestions,
  getAllQuestionsBySpeciality,
  getQuestionByPatientId,
} from "@/API/questionsApi";
import { answerQ } from "../../API/questionsApi";

// Async thunk to fetch all questions
export const fetchAllQuestions = createAsyncThunk(
  "questions/fetchAllQuestions",
  async (_, thunkAPI) => {
    try {
      const questions = await getAllQuestions();
      return questions.data.Question;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Async thunk to fetch all questions by speciality
export const fetchAllQuestionsBySpeciality = createAsyncThunk(
  "questions/fetchAllQuestionsBySpeciality",
  async (speciality, thunkAPI) => {
    try {
      const questions = await getAllQuestionsBySpeciality(speciality);
      return questions.data.Question;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Async thunk to fetch questions by patientId
export const fetchQuestionByPatientId = createAsyncThunk(
  "questions/fetchQuestionByPatientId",
  async (patientId, thunkAPI) => {
    try {
      const questions = await getQuestionByPatientId(patientId);
      return questions;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const answerQuestion = createAsyncThunk(
  "questions/answerQuestion",
  async ({ id, data }, thunkAPI) => {
    try {
      const questions = await answerQ(id, data);
      return questions;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);
const questionsSlice = createSlice({
  name: "questions",
  initialState: {
    questions: [],
    selectedSpeciality: "",
    selectedQuestions: [],
    loading: false,
    error: null,
  },
  reducers: {
    setSelectedSpeciality: (state, action) => {
      state.selectedSpeciality = action.payload;
    },
    setSelectedQuestions: (state, action) => {
      state.selectedQuestions = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Get All Questions
      .addCase(fetchAllQuestions.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllQuestions.fulfilled, (state, action) => {
        state.questions = action.payload;
        state.loading = false;
      })
      .addCase(fetchAllQuestions.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      // Get All Questions By Speciality
      .addCase(fetchAllQuestionsBySpeciality.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllQuestionsBySpeciality.fulfilled, (state, action) => {
        state.selectedQuestions = action.payload;
        state.loading = false;
      })
      .addCase(fetchAllQuestionsBySpeciality.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      // Get Questions By PatientId
      .addCase(fetchQuestionByPatientId.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchQuestionByPatientId.fulfilled, (state, action) => {
        state.selectedQuestions = action.payload;
        state.loading = false;
        state.selectedSpeciality = "";
      })
      .addCase(answerQuestion.pending, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(answerQuestion.fulfilled, (state, action) => {
        state.selectedQuestions[
          state.selectedQuestions.findIndex(
            (el) => el.questionid === action.payload.questionid
          )
        ] = action.payload;
        state.loading = false;
      })
      .addCase(answerQuestion.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export const { setSelectedSpeciality, setSelectedQuestions } =
  questionsSlice.actions;

export default questionsSlice.reducer;
