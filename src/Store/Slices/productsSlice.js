// Store/productsSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getSingleProduct,
  getProductsByCategory,
  getAllCategories,
} from "@/API/PharmacyApi";

// Async thunk to fetch all categories
export const fetchAllCategories = createAsyncThunk(
  "products/fetchAllCategories",
  async () => {
    const categories = await getAllCategories();
    return categories.categories;
  }
);

// Async thunk to fetch all products of a category
export const fetchAllProducts = createAsyncThunk(
  "products/fetchAllProducts",
  async (id) => {
    const products = await getProductsByCategory(id);
    return products.products;
  }
);

// Async thunk to fetch a single product
export const fetchSingleProduct = createAsyncThunk(
  "products/fetchSingleProduct",
  async (id) => {
    const product = await getSingleProduct(id);
    return product.product;
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    categories: [],
    selectedProduct: [],
    selectedItems: [],
    selectedCat: "None",
    isLoading: false,
    error: null,
  },
  reducers: {
    setSelectedProduct: (state, action) => {
      state.selectedProduct = action.payload;
    },
    setSelectedItems: (state, action) => {
      state.selectedItems = action.payload;
    },
    setSelectedCat: (state, action) => {
      state.selectedCat = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSingleProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchSingleProduct.fulfilled, (state, action) => {
        state.selectedProduct = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchSingleProduct.rejected, (state, action) => {
        state.error = action.error.message;
        state.isLoading = false;
      })
      .addCase(fetchAllProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.items = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchAllProducts.rejected, (state, action) => {
        state.error = action.error.message;
        state.isLoading = false;
      })
      .addCase(fetchAllCategories.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchAllCategories.rejected, (state, action) => {
        state.error = action.error.message;
        state.isLoading = false;
      });
  },
});

export const { setSelectedProduct, setSelectedItems, setSelectedCat } =
  productsSlice.actions;
export default productsSlice.reducer;
