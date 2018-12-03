import axios from 'axios';
import {
    ACCOUNT_SIGNIN,
    ACCOUNT_SIGNIN_SUCCESS,
    ACCOUNT_SIGNIN_FAILURE,
    ACCOUNT_SIGNUP,
    ACCOUNT_SIGNUP_SUCCESS,
    ACCOUNT_SIGNUP_FAILURE,
    ACCOUNT_GET_STATUS,
    ACCOUNT_GET_STATUS_SUCCESS,
    ACCOUNT_GET_STATUS_FAILURE,
    ACCOUNT_SIGNOUT,
} from './ActionTypes';

export function signInRequest(id, password) {
  return async (dispatch) => {
    // Inform signin API is starting
    dispatch(signIn());

    // API REQUEST
    try {
      const success = await axios.post('/api/account/signin', { id, password });
      console.log(success);
      dispatch(signInSuccess(id));
    } catch (error) {
      console.log('fail');
      dispatch(signInFailure(error.response.data.code));
    }
  };
}

export function signUpRequest(name, id, password) {
  return async (dispatch) => {
    dispatch(signUp());

    try {
      const success = await axios.post('/api/account/signup', { name, id, password });
      console.log(success);
      dispatch(signUpSuccess(id));
    } catch (error) {
      console.log('fail');
      dispatch(signUpFailure(error.response.data.code));
    }
  };
}

export function signIn() {
  return {
    type: ACCOUNT_SIGNIN,
  };
}

export function signUp() {
  return {
    type: ACCOUNT_SIGNUP,
  };
}

export function signInSuccess(id) {
  return {
    type: ACCOUNT_SIGNIN_SUCCESS,
    id,
  };
}

export function signUpSuccess(id) {
  return {
    type: ACCOUNT_SIGNUP_SUCCESS,
    id,
  };
}

export function signInFailure(error) {
  return {
    type: ACCOUNT_SIGNIN_FAILURE,
    error,
  };
}

export function signUpFailure(error) {
  return {
    type: ACCOUNT_SIGNUP_FAILURE,
    error,
  };
}

/* GET STATUS */
export function getStatusRequest() {
  return (dispatch) => {
      // inform Get Status API is starting
      dispatch(getStatus());

      return axios.get('/api/account/getInfo')
      .then((response) => {
          dispatch(getStatusSuccess(response.data.info.id));
      }).catch((error) => {
          dispatch(getStatusFailure());
      });
  };
}

export function getStatus() {
  return {
      type: ACCOUNT_GET_STATUS,
  };
}

export function getStatusSuccess(id) {
  return {
      type: ACCOUNT_GET_STATUS_SUCCESS,
      id,
  };
}

export function getStatusFailure() {
  return {
      type: ACCOUNT_GET_STATUS_FAILURE,
  };
}

export function signOutRequest() {
  return (dispatch) => {
      return axios.post('/api/account/signout')
      .then((response) => {
          dispatch(signOut());
      });
  };
}

export function signOut() {
  return {
      type: ACCOUNT_SIGNOUT
  };
}
