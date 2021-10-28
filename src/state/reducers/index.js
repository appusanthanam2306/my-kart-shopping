import { combineReducers } from "redux";
import cartReducer from "./CartReducer";
import itemReducer from "./ItemReducer";
import wishListReducer from "./WishListReducer";

const reducers = combineReducers({
  cart: cartReducer,
  item: itemReducer,
  wishList: wishListReducer
});

export default reducers;
