import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  category: "",
  orderBy: "",
  sortBy: "",
  wishlists: [],
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setCategory: (state, action) => {
      state.category = action.payload;
    },
    setOrderBy: (state, action) => {
      state.orderBy = state.orderBy === action.payload ? "" : action.payload; // Toggle functionality
    },
    setSortBy: (state, action) => {
      state.sortBy = state.sortBy === action.payload ? "" : action.payload; // Toggle functionality
    },

    addProductToWishlist: (state, action) => {
      const { product } = action.payload;
      const existingWishlistIndex = state.wishlists.findIndex(
        (p) => p.id === product.id
      );

      if (existingWishlistIndex === -1) {
        state.wishlists.push({ ...product, quantity: 1 });
      } else {
        state.wishlists[existingWishlistIndex].quantity++;
      }
    },

    removeProductFromWishlist: (state, action) => {
      const { productId } = action.payload;
      const existingWishlistIndex = state.wishlists.findIndex(
        (p) => p.id === productId
      );

      if (existingWishlistIndex !== -1) {
        state.wishlists.splice(existingWishlistIndex, 1);
      }
    },

    removeAllWishlists: (state) => {
      state.wishlists = [];
    },
  },
});

export const {
  setCategory,
  setOrderBy,
  setSortBy,
  addProductToWishlist,
  removeProductFromWishlist,
  removeAllWishlists
} = productSlice.actions;

export const ProductState = (state) => state.product;

export default productSlice.reducer;
