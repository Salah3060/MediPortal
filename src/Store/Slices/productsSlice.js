// Store/productsSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getSingleProduct,
  getProductsByCategory,
  getAllCategories,
  getAllProducts,
} from "@/API/PharmacyApi";

// Async thunk to fetch all categories
export const fetchAllCategories = createAsyncThunk(
  "products/fetchAllCategories",
  async (_, thunkAPI) => {
    try {
      const categories = await getAllCategories();
      return categories.data.categories;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Async thunk to fetch all products
export const fetchAllProducts = createAsyncThunk(
  "products/fetchAllProducts",
  async (_, thunkAPI) => {
    try {
      const products = await getAllProducts();
      return products.data.products;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Async thunk to fetch all products of a category
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (catName, thunkAPI) => {
    try {
      const products = await getProductsByCategory(catName);
      return products.data.products;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Async thunk to fetch a single product
export const fetchSingleProduct = createAsyncThunk(
  "products/fetchSingleProduct",
  async (id, thunkAPI) => {
    try {
      const product = await getSingleProduct(id);
      return product.data.products[0];
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState: {
    items: [], // List of products
    categories: [], // List of categories
    selectedProduct: null, // A single product
    selectedItems: [], // User-selected items
    filteredItems: [], // Filtered items
    selectedCat: "Beauty", // Currently selected category
    isLoading: false, // Loading state
    error: null, // Error message
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
    setFilteredItems: (state, action) => {
      state.filteredItems = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch single product
      .addCase(fetchSingleProduct.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchSingleProduct.fulfilled, (state, action) => {
        state.selectedProduct = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchSingleProduct.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      })
      // Fetch all products in a category
      .addCase(fetchProducts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.selectedItems = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      })
      // fetch all products
      .addCase(fetchAllProducts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.items = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchAllProducts.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      })
      // Fetch all categories
      .addCase(fetchAllCategories.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAllCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchAllCategories.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      });
  },
});

export const {
  setSelectedProduct,
  setSelectedItems,
  setSelectedCat,
  setFilteredItems,
} = productsSlice.actions;

export default productsSlice.reducer;
