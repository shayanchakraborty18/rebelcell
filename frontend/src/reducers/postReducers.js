import {
ALL_POSTS_REQUEST,
ALL_POSTS_SUCCESS,
ALL_POSTS_FAIL,
POST_DETAILS_REQUEST,
POST_DETAILS_SUCCESS,
POST_DETAILS_FAIL,
CLEAR_ERRORS,
} from '../constants/postConstants';

export const postsReducer = (state = { posts: [] }, action) => {
  switch(action.type) {
    case ALL_POSTS_REQUEST: 
    return {
      loading: true,
      posts: []
    }
    case ALL_POSTS_SUCCESS: 
      return {
        loading: false,
        posts: action.payload.posts,
        postsCount: action.payload.postsCount,
        resPerPage: action.payload.resPerPage,
        filteredPostsCount: action.payload.filteredPostsCount
      }
    case ALL_POSTS_FAIL:
      return {
        loading: false,
        error: action.payload
      }
    case CLEAR_ERRORS: 
      return {
        ...state,
        error: null
      }
    default: 
      return state;
  }
}

export const postDetailsReducer = (state = { post: {} }, action) => {
  switch(action.type) {
    case POST_DETAILS_REQUEST:
      return {
        loading: true,
        ...state
      }
    case POST_DETAILS_SUCCESS:
      return {
        loading: false,
        post: action.payload
      }
    case POST_DETAILS_FAIL:
      return {
        loading: false,
        ...state,
        error: action.payload
      }
    case CLEAR_ERRORS: 
      return {
        ...state,
        error: null
      }
    default: 
      return state;
  }

}