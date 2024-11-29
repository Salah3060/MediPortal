// Store/store.js
import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "@/Store/Slices/productsSlice";
import userReducer from "@/Store/Slices/userSlice";

const store = configureStore({
  reducer: {
    products: productsReducer,
    user: userReducer,
  },
});

export default store;
