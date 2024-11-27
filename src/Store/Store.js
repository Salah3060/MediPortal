// Store/store.js
import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "@/Store/Slices/productsSlice";

const store = configureStore({
  reducer: {
    products: productsReducer,
  },
});

export default store;
