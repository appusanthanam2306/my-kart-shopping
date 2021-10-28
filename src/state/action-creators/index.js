import {
  GET_ITEMS,
  ITEMS_ERROR,
  ITEMS_CATEGORY,
  ITEMS_SEARCH,
  ADD_TO_CART,
  REMOVE_FROM_CART,
  ADD_TO_WISHLIST,
  REMOVE_FROM_WISHLIST,
  PLACE_ORDER,
  PLACE_ORDER_WISHLIST
} from "../types";
import { getItem } from "../../services/ItemService";

export const addToCart = (itemId) => {
  return (dispatch) => {
    dispatch({
      type: ADD_TO_CART,
      payload: itemId
    });
  };
};

export const removeFromCart = (amount) => {
  return (dispatch) => {
    dispatch({
      type: REMOVE_FROM_CART,
      payload: amount
    });
  };
};

export const addToWishList = (itemId) => {
  return (dispatch) => {
    dispatch({
      type: ADD_TO_WISHLIST,
      payload: itemId
    });
  };
};

export const removeFromWishList = (amount) => {
  return (dispatch) => {
    dispatch({
      type: REMOVE_FROM_WISHLIST,
      payload: amount
    });
  };
};

export const getItems = () => async (dispatch) => {
  try {
    const res = await getItem();
    dispatch({
      type: GET_ITEMS,
      payload: res.data
    });
  } catch (error) {
    dispatch({
      type: ITEMS_ERROR,
      payload: error
    });
  }
};

export const itemsBasedCategory = (category) => {
  return (dispatch) => {
    dispatch({
      type: ITEMS_CATEGORY,
      payload: category
    });
  };
};

export const itemsBasedSearch = (text) => {
  return (dispatch) => {
    dispatch({
      type: ITEMS_SEARCH,
      payload: text
    });
  };
};

export const placeOrder = () => {
  return (dispatch) => {
    dispatch({
      type: PLACE_ORDER
    });
  };
};

export const placeOrderFromWishList = () => {
  return (dispatch) => {
    dispatch({
      type: PLACE_ORDER_WISHLIST
    });
  };
};
