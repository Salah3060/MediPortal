// Store/store.js
import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "@/Store/Slices/productsSlice";
import userReducer from "@/Store/Slices/userSlice";
import cartReducer from "@/Store/Slices/cartSlice";
import searchReducer from "@/Store/Slices/searchSlice";
import offersReducer from "@/Store/Slices/offersSlice";
import questionsReducer from "@/Store/Slices/questionsSlice";
import appointmentReducer from "@/Store/Slices/AppointmentsSlice";
import workspaceReducer from "@/Store/Slices/WorkspaceSlice";
import ResetPassword from "@/Store/Slices/resetPasswordSlice";
import logger from "redux-logger";

const store = configureStore({
  reducer: {
    products: productsReducer,
    user: userReducer,
    cart: cartReducer,
    search: searchReducer,
    offers: offersReducer,
    questions: questionsReducer,
    appointments: appointmentReducer,
    workspaces: workspaceReducer,
    resetPasswoed: ResetPassword,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
