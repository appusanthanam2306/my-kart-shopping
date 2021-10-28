import { GET_ITEMS, ITEMS_ERROR, ITEMS_CATEGORY, ITEMS_SEARCH } from "../types";

const initialState = {
  items: [],
  loading: true,
  filtersApplied: {
    searchText: "",
    category: "SPORTS"
  }
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ITEMS:
      return {
        ...state,
        items: action.payload,
        loading: false
      };
    case ITEMS_ERROR:
      return {
        loading: false,
        error: action.payload
      };
    case ITEMS_CATEGORY:
      return {
        ...state,
        filtersApplied: {
          ...state.filtersApplied,
          category: action.payload
        }
      };
    case ITEMS_SEARCH:
      return {
        ...state,
        filtersApplied: {
          ...state.filtersApplied,
          searchText: action.payload.toLowerCase()
        }
      };
    default:
      return state;
  }
}
