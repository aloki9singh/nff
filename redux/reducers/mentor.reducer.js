import {
    AUTH_SIGN_IN_ERROR,
    AUTH_SIGN_IN_LOADING,
    AUTH_SIGN_IN_SUCCESS,
    AUTH_SIGN_UP_ERROR,
    AUTH_SIGN_UP_LOADING,
    AUTH_SIGN_UP_SUCCESS,
    AUTH_SIGN_OUT,
  } from "../types/mentor.types";
  
  export const authInitialState = {
    loading: false,
    data: {
      email: "",
      photoURL: "",
      role: "",
      uid: "",
      verified: false,
    },
    error: false,
  };
   
  export const mentorAuthReducer = (state = authInitialState, { type, payload }) => {
    switch (type) {
      case AUTH_SIGN_IN_LOADING:
        return {
          ...state,
          loading: true,
          error: false,
        };
      case AUTH_SIGN_UP_LOADING:
        return {
          ...state,
          loading: true,
          error: false,
        };
  
      case AUTH_SIGN_IN_SUCCESS:
        return {
          ...state,
          loading: false,
          data: {
            email: payload.email,
            photoURL: payload.photoURL,
            role: payload.role,
            uid: payload.uid,
            verified: true,
          },
        };
      case AUTH_SIGN_UP_SUCCESS:
        return {
          ...state,
          loading: false,
          data: {
            email: payload.email,
            photoURL: payload.photoURL,
            role: payload.role,
            uid: payload.uid,
            verified:true
          },
        };
  
      case AUTH_SIGN_IN_ERROR:
        return {
          ...state,
          loading: false,
          error: true,
        };
      case AUTH_SIGN_UP_ERROR:
        return {
          ...state,
          loading: false,
          error: true,
        };
  
      case AUTH_SIGN_OUT:
        return {
          ...state,
          loading: false,
          data: {
            email: "",
            photoURL: "",
            role: "",
            uid: "",
            verified: false,
          },
        };
  
      default:
        return state;
    }
  };
  