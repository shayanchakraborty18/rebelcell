import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';

import { postsReducer, postDetailsReducer } from "./reducers/postReducers";

const reducer = combineReducers({
  posts: postsReducer,
  postDetails: postDetailsReducer
});

const initialState = {
  // cart: {

  // }
}

const middleware = [thunk];


const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;