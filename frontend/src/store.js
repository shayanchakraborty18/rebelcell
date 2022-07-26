import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';

import { postsReducer, postDetailsReducer } from "./reducers/postReducers";
import { productsReducer, productDetailsReducer, categoriesReducer, categoryProductsReducer  } from "./reducers/productReducers";
import { cartReducer } from './reducers/cartReducers';
import {authReducer, userReducer}  from './reducers/userReducers';

import { newOrderReducer, myOrdersReducer, orderDetailsReducer} from './reducers/orderReducers';

const reducer = combineReducers({
  posts: postsReducer,
  postDetails: postDetailsReducer,
  products: productsReducer,
  productDetails: productDetailsReducer,
  categories: categoriesReducer,
  categoryProducts: categoryProductsReducer,
  cart: cartReducer,
  auth: authReducer,
  user: userReducer,
  newOrder: newOrderReducer,
  myOrders: myOrdersReducer,
  orderDetails: orderDetailsReducer,
});

const initialState = {
  cart: {
    cartItems: localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [],
    shippingInfo: localStorage.getItem('shippingInfo')
            ? JSON.parse(localStorage.getItem('shippingInfo'))
            : {}
  }
}

const middleware = [thunk];


const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;