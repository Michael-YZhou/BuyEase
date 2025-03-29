export const formatDecimals = (num) => {
  return (Math.round(num * 100) / 100).toFixed(2);
};

export const updateCart = (state) => {
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
  // return cart
  return state;
};
