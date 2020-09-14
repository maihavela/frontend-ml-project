import {
    REQUEST_ACTION_BEGIN,
    REQUEST_ACTION_FALIURE,
    SEARCH_QUERY_RESULTS_SUCCESS,
    FETCH_PRODUCT_SUCCESS
} from "../actions/ActionTypes";

export const initialState = {
  loading: false,
  error: null,
  products: [],
  product: null
};

export default function ProductsReducer(state = initialState, action) {
  switch (action.type) {
    case REQUEST_ACTION_BEGIN:
      return { ...state, loading: true };
    case REQUEST_ACTION_FALIURE:
        return { ...state, loading: false, error: action.payload.error };
    case SEARCH_QUERY_RESULTS_SUCCESS:
        return { ...state, loading: false, products: action.payload.queryResult.items };
    case FETCH_PRODUCT_SUCCESS:
        return { ...state, loading: false, product: action.payload.product.item };
    default:
      return state;
  }
}
