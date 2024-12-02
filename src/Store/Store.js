// Store/store.js
import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "@/Store/Slices/productsSlice";
import userReducer from "@/Store/Slices/userSlice";
import cartReducer from "@/Store/Slices/cartSlice";
import searchReducer from "@/Store/Slices/searchSlice";
import logger from "redux-logger";

const store = configureStore({
  reducer: {
    products: productsReducer,
    user: userReducer,
    cart: cartReducer,
    search: searchReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
