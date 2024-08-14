import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  carts: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProductToCart: (state, action) => {
      const { product } = action.payload;
      const existingProductIndex = state.carts.findIndex(
        (p) => p.product.id === product.id
      );

      if (existingProductIndex === -1) {
        state.carts.push({ product, quantity: 1 });
      } else {
        state.carts[existingProductIndex].quantity++;
      }
    },
    removeProductFromCart: (state, action) => {
      const { productId } = action.payload;
      const existingProductIndex = state.carts.findIndex(
        (p) => p.product.id === productId
      );

      state.carts.splice(existingProductIndex, 1);
    },
    clearCart: (state) => {
      state.carts = [];
    },
    updateProductQuantity: (state, action) => {
      const { productId, quantity } = action.payload;
      const existingProductIndex = state.carts.findIndex(
        (p) => p.product.id === productId
      );

      if (existingProductIndex !== -1) {
        state.carts[existingProductIndex].quantity = quantity;
      }
    },
    incrementCartQuantity: (state, action) => {
      const { productId } = action.payload;
      const existingProductIndex = state.carts.findIndex(
        (p) => p.product.id === productId
      );

      if (existingProductIndex !== -1) {
        state.carts[existingProductIndex].quantity++;
      }
    },
    decrementCartQuantity: (state, action) => {
      const { productId } = action.payload;
      const existingProductIndex = state.carts.findIndex(
        (p) => p.product.id === productId
      );

      if (existingProductIndex !== -1) {
        if (state.carts[existingProductIndex].quantity > 1) {
          state.carts[existingProductIndex].quantity--;
        } else {
          state.carts.splice(existingProductIndex, 1);
        }
      }
    },

    addAllProductToCart: (state, action) => {
      const { products } = action.payload;

      products.forEach((wishlistProduct) => {
        const existingProductIndex = state.carts.findIndex(
          (cartItem) => cartItem.product.id === wishlistProduct.id
        );
        if (existingProductIndex === -1) {
          // Product not in cart, add it with quantity 1
          state.carts.push({ product: wishlistProduct, quantity: 1 });
        }
        // if (existingProductIndex !== -1) {
        //   state.carts[existingProductIndex].quantity++;
        // } else {
        //   state.carts.push({ product: wishlistProduct, quantity: 1 });
        // }
      });
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  addProductToCart,
  removeProductFromCart,
  clearCart,
  incrementCartQuantity,
  decrementCartQuantity,
  updateProductQuantity,
  addAllProductToCart,
} = cartSlice.actions;

export const getTotalQuantity = (state) =>
  state.cart.carts.reduce((acc, cartItem) => acc + cartItem.quantity, 0);

export const getSubTotalPrice = (state) =>
  state.cart.carts.reduce(
    (acc, cartItem) => acc + cartItem.product.price * cartItem.quantity,
    0
  );

export const getTotalPrice = (state) =>
  state.cart.carts.reduce((acc, cartItem) => {
    const { price, discountPercentage } = cartItem.product;
    const discountedPrice = discountPercentage
      ? price - (price * discountPercentage) / 100
      : price;
    return acc + discountedPrice * cartItem.quantity;
  }, 0);

export const getTotalDiscountPercentage = (state) =>
  state.cart.carts.reduce(
    (acc, cartItem) => acc + cartItem.product.discountPercentage,
    0
  );

export const CartState = (state) => state.cart;

export default cartSlice.reducer;
