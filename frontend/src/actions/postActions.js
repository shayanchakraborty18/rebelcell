import axios from 'axios';

import {
ALL_POSTS_REQUEST,
ALL_POSTS_SUCCESS,
ALL_POSTS_FAIL,
POST_DETAILS_REQUEST,
POST_DETAILS_SUCCESS,
POST_DETAILS_FAIL,
CLEAR_ERRORS,
} from '../constants/postConstants';

export const getPosts = (currentPage = 1) => async (dispatch) => {
  try {
    dispatch({type: ALL_POSTS_REQUEST});

    const {data} = await axios.get(`/api/v1/posts?page=${currentPage}`);

    dispatch({
      type: ALL_POSTS_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: ALL_POSTS_FAIL,
      payload: error.response.data.message
    })
  }
}


export const getPostDetails = (slug) => async (dispatch) => {
  try {
    dispatch({ type: POST_DETAILS_REQUEST});

    const { data } = await axios.get(`/api/v1/post/${slug}`);
    
    dispatch({
      type: POST_DETAILS_SUCCESS,
      payload: data.post
    });
  } catch (error) {
    dispatch({
      type: POST_DETAILS_FAIL,
      payload: error.response.data.message
    });
  }
}

export const clearErrors = () => async (dispatch) => {
    dispatch({
      type: CLEAR_ERRORS
    })
}