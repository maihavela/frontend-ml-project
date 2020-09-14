import {
  REQUEST_ACTION_BEGIN,
  REQUEST_ACTION_FALIURE,
  SEARCH_QUERY_RESULTS_SUCCESS,
  FETCH_PRODUCT_SUCCESS
  } from "./ActionTypes";
  
  export const requestActionBegin = () => ({
    type: REQUEST_ACTION_BEGIN,
  });

  export const requestActionFailure = (error) => ({
    type: REQUEST_ACTION_FALIURE,
    payload: { error },
  });
  
  export const searchQuerySuccess = (queryResult) => ({
    type: SEARCH_QUERY_RESULTS_SUCCESS,
    payload: { queryResult },
  });

  export const fetchProductSuccess = (product) => ({
    type: FETCH_PRODUCT_SUCCESS,
    payload: { product },
  });
  
  export function searchProducts(query) {
    return (dispatch) => {
      dispatch(requestActionBegin()); 
      fetch(`http://localhost:3001/api/items?q=${query}`)
        .then(async (response) => {          
          if (!response.ok) {
            dispatch(requestActionFailure({ status: response.status, error: response.statusText })); 
          }

          const queryResult = await response.json();   
          if (queryResult.error) { 
            dispatch(requestActionFailure(queryResult.error)); 
          }
          
          dispatch(searchQuerySuccess(queryResult));
        })
        .catch((error) => {
          dispatch(requestActionFailure(error));
        });
    };
  }

  export function searchProductById(id) {
    return (dispatch) => {
      dispatch(requestActionBegin());
      fetch(`http://localhost:3001/api/items/${id}`)
        .then(async (response) => {          
          if (!response.ok) {
            dispatch(requestActionFailure({ status: response.status, error: response.statusText })); 
          }

          const product = await response.json();
          if (product.error) { 
            dispatch(requestActionFailure(product.error)); 
          }
          
          dispatch(fetchProductSuccess(product));
        })
        .catch((error) => {
          dispatch(requestActionFailure(error));
        });
    };
  }
