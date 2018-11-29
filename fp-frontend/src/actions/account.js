import axios from 'axios';
import {
    ACCOUNT_SIGNIN,
    ACCOUNT_SIGNIN_SUCCESS,
    ACCOUNT_SIGNIN_FAILURE,
} from './ActionTypes';

/*============================================================================
    account
==============================================================================*/

/* SIGNIN */
export function signInRequest(id, password) {
  return async (dispatch) => {
    // Inform signin API is starting
    dispatch(signIn());

    // API REQUEST
    try {
      const success = await axios.post('/api/account/signin', { id, password });
      console.log(success);
      dispatch(signInSuccess(id));
    } catch {
      console.log('fail');
      dispatch(signInFailure());
    }
  };
}

export function signIn() {
  return {
    type: ACCOUNT_SIGNIN,
  };
}

export function signInSuccess(id) {
  return {
    type: ACCOUNT_SIGNIN_SUCCESS,
    id,
  };
}

export function signInFailure() {
  return {
    type: ACCOUNT_SIGNIN_FAILURE,
  };
}