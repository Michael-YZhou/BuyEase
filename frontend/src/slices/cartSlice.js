import { createSlice } from "@reduxjs/toolkit";
import { formatDecimals } from "../utils/formatNumber";

const initialState = localStorage.getItem("cart")
  ? { cartItems: JSON.parse(localStorage.getItem("cart")) }
  : { cartItems: [] };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existItem = state.cartItems.find((x) => x._id === item._id);
      if (existItem) {
        state.cartItems = state.cartItems.map((x) =>
          x._id === existItem._id ? item : x
        );
      } else {
        state.cartItems = [...state.cartItems, item];
      }

      // calculate items price
      state.itemsPrice = formatDecimals(
        state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
      );
      // calculate shipping price (If order is more than $100, shipping is free, otherwise $10)
      state.shippingPrice = state.itemsPrice > 100 ? 0 : 10;
      // calculate tax price (15% of items price)
      state.taxPrice = formatDecimals(0.15 * Number(state.itemsPrice));
      // calculate total price
      state.totalPrice = formatDecimals(
        Number(state.itemsPrice) + state.shippingPrice + Number(state.taxPrice)
      );
      // save cart to local storage
      localStorage.setItem("cart", JSON.stringify(state));
    },
  },
});

export const { addToCart } = cartSlice.actions;
export default cartSlice.reducer;
