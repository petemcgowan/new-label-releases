import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL
} from '../actions/types';

const initialState = {
  token: localStorage.getItem('NLRtoken'),
  email: localStorage.getItem('NLRemail'),
  isAuthenticated: null,
  isLoading: false,
  user: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case USER_LOADING:
      console.log("authReducer, USER_LOADING");
      return {
        ...state,
        isLoading: true
      };
    case USER_LOADED:
      console.log("authReducer, USER_LOADED");
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        user: action.payload
      };
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      console.log("authReducer, REGISTER_SUCCESS");
      localStorage.setItem('NLRtoken', action.payload.token);
      localStorage.setItem('NLRemail', action.payload.email);
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        isLoading: false
      };
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT_SUCCESS:
    case REGISTER_FAIL:
      console.log("authReducer, REGISTER_FAIL");
      localStorage.removeItem('NLRtoken');
      localStorage.removeItem('NLRemail');
      return {
        ...state,
        token: null,
        user: null,
        isAuthenticated: false,
        isLoading: false
      };
    default:
      return state;
  }
}
