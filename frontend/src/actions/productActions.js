import axios from 'axios';

import {
ALL_PRODUCTS_REQUEST,
ALL_PRODUCTS_SUCCESS,
ALL_PRODUCTS_FAIL,
PRODUCT_DETAILS_REQUEST,
PRODUCT_DETAILS_SUCCESS,
PRODUCT_DETAILS_FAIL,
CATEGORIES_REQUEST,
CATEGORIES_SUCCESS,
CATEGORIES_FAIL,
CATEGORY_PRODUCTS_REQUEST,
CATEGORY_PRODUCTS_SUCCESS,
CATEGORY_PRODUCTS_FAIL,
CLEAR_ERRORS
} from '../constants/productConstants';

export const getProducts = (keyword = '', currentPage = 1, availibility = '') => async (dispatch) => {
  try {
    dispatch({type: ALL_PRODUCTS_REQUEST});

    let link = `/api/v1/products/?keyword=${keyword}&page=${currentPage}`;

    if(availibility) {
      link = `/api/v1/products/?keyword=${keyword}&page=${currentPage}&availibility=${availibility}`;
    }

    const { data }  = await axios.get(link);

    dispatch({
      type: ALL_PRODUCTS_SUCCESS,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: ALL_PRODUCTS_FAIL,
      payload: error.response.data.message
    })
  }
}


export const getProductDetails = (slug) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST});

    const { data } = await axios.get(`/api/v1/product/${slug}`);
    
    dispatch({
      type: PRODUCT_DETAILS_SUCCESS,
      payload: data.product
    })
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload: error.response.data.message
    })
  }
}


export const getCategories = () => async (dispatch) => {
  try {
    dispatch({ type: CATEGORIES_REQUEST });

    const {data} = await axios.get(`/api/v1/categories`);

    dispatch({
      type: CATEGORIES_SUCCESS,
      payload: data.categories
    })
  } catch (error) { 
    dispatch({
      type: CATEGORIES_FAIL,
      payload: error.response.data.message
    })
  }
}



export const getProductsByCategory = (catslug, keyword = '', currentPage = 1, availibility = '') => async (dispatch) => {
  try {
    dispatch({type: CATEGORY_PRODUCTS_REQUEST});

    let link = `/api/v1/products/${catslug}/?keyword=${keyword}&page=${currentPage}`;

    if(availibility) {
      link = `/api/v1/products/${catslug}/?keyword=${keyword}&page=${currentPage}&availibility=${availibility}`;
    }
    
    const { data }  = await axios.get(link);

    dispatch({
      type: CATEGORY_PRODUCTS_SUCCESS,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: CATEGORY_PRODUCTS_FAIL,
      payload: error.response.data.message
    })
  }
}

export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS })
}