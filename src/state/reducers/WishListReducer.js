import {
  ADD_TO_WISHLIST,
  REMOVE_FROM_WISHLIST,
  PLACE_ORDER_WISHLIST
} from "./../types";

const initialWishList = JSON.parse(localStorage.getItem("wishListItems")) || [];

const reducer = (state = initialWishList, action) => {
  switch (action.type) {
    case ADD_TO_WISHLIST:
      let wishListItems = [...state, action.payload];
      localStorage.setItem("wishListItems", JSON.stringify(wishListItems));
      return wishListItems;
    case REMOVE_FROM_WISHLIST:
      let filteredWishListItems = state.filter(
        (wishListItem) => wishListItem !== action.payload
      );
      localStorage.setItem(
        "wishListItems",
        JSON.stringify(filteredWishListItems)
      );
      return filteredWishListItems;
    case PLACE_ORDER_WISHLIST:
      localStorage.setItem("wishListItems", JSON.stringify([]));
      return [];
    default:
      return state;
  }
};

export default reducer;
