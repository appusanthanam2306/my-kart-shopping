import { ADD_TO_CART, REMOVE_FROM_CART, PLACE_ORDER } from "../types";

const initialCartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

const reducer = (state = initialCartItems, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      let cartItems = [...state, action.payload];
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      return cartItems;
    case REMOVE_FROM_CART:
      let filteredItems = state.filter(
        (cartItem) => cartItem !== action.payload
      );
      localStorage.setItem("cartItems", JSON.stringify(filteredItems));
      return filteredItems;
    case PLACE_ORDER:
      localStorage.setItem("cartItems", JSON.stringify([]));
      return [];
    default:
      return state;
  }
};

export default reducer;
