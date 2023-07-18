export const addDecimals = (num) => {
  return (Math.round(num * 100) / 100).toFixed(2);
};

export const updateCart = (state) => {
  //calculate item price
  state.itemsPrice = addDecimals(
    state.cartItem.reduce((acc, item) => acc + item.price * item.qty, 0)
  );

  //calculate shipping price(if order is over 9,999 then free else 150 for shipping )
  state.shippingPrice = addDecimals(state.itemsPrice > 9999 ? 0 : 150);

  //calculate tax price(15%)
  state.taxPrice = addDecimals(Number((0.15 * state.itemsPrice).toFixed(2)));

  //calculate total price
  state.totalPrice = (
    Number(state.itemsPrice) +
    Number(state.shippingPrice) +
    Number(state.taxPrice)
  ).toFixed(2);
  localStorage.setItem('cart', JSON.stringify(state));
  return state;
};
