import { createSlice } from '@reduxjs/toolkit';
import { updateCart } from '../../utils/cart.utils';

const initialState = localStorage.getItem('cart')
  ? JSON.parse(localStorage.getItem('cart'))
  : {
      cartItem: [],
      shippingAddress: {},
      paymentMethods: 'PayPal',
    };

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;

      const existItem = state.cartItem.find((x) => x._id === item._id);

      if (existItem) {
        state.cartItem = state.cartItem.map((x) =>
          x._id === existItem._id ? item : x
        );
      } else {
        state.cartItem = [...state.cartItem, item];
      }

      return updateCart(state);
    },
    removerFromCart: (state, action) => {
      state.cartItem = state.cartItem.filter((x) => x._id !== action.payload);
      return updateCart(state);
    },
    saveShippingAddress: (state, action) => {
      state.shippingAddress = action.payload;
      return updateCart(state);
    },
    savePaymentMethod: (state, action) => {
      state.paymentMethods = action.payload;
      return updateCart(state);
    },
  },
});

export const {
  addToCart,
  removerFromCart,
  saveShippingAddress,
  savePaymentMethod,
} = cartSlice.actions;

export default cartSlice.reducer;
