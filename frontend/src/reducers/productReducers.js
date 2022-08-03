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

export const productsReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case ALL_PRODUCTS_REQUEST:
      return {
        loading: true,
        products: []
      }
    case ALL_PRODUCTS_SUCCESS:
      return {
        loading: false,
        productsCount: action.payload.productsCount,
        resPerPage: action.payload.resPerPage,
        filteredProductsCount: action.payload.filteredProductsCount,
        products: action.payload.products
      }
    case ALL_PRODUCTS_FAIL:
      return {
        loading: false,
        error: action.payload
      }
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      }
    default:
      return state;
  }
}


export const productDetailsReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case PRODUCT_DETAILS_REQUEST:
      return {
        loading: true,
        product: {}
      }
    case PRODUCT_DETAILS_SUCCESS:
      return {
        loading: false,
        product: action.payload
      }
    case PRODUCT_DETAILS_FAIL:
      return {
        loading: false,
        ...state,
        error: action.payload
      }
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      }  
    default:
      return state;
  }
}

export const categoriesReducer = (state = { categories: [] }, action) => {
  switch (action.type) {
    case CATEGORIES_REQUEST:
      return {
        loading: true,
        categories: []
      }
    case CATEGORIES_SUCCESS:
      return {
        loading: false,
        categories: action.payload
      }
    case CATEGORIES_FAIL:
      return {
        ...state,
        error: action.payload
      }
    default:
      return state;
  }
}

export const categoryProductsReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case CATEGORY_PRODUCTS_REQUEST:
      return {
        loading: true,
        products: []
      }
    case CATEGORY_PRODUCTS_SUCCESS:
      return {
        loading: false,
        productsCount: action.payload.productsCount,
        resPerPage: action.payload.resPerPage,
        filteredProductsCount: action.payload.filteredProductsCount,
        products: action.payload.products
      }
    case CATEGORY_PRODUCTS_FAIL:
      return {
        loading: false,
        error: action.payload
      }
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      }
    default:
      return state;
  }
}