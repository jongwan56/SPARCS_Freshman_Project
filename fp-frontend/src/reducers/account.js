import * as types from 'actions/ActionTypes';
import update from 'react-addons-update';

const initialState = {
  login: {
    status: 'INIT',
    error: -1,
  },
  register: {
    status: 'INIT',
    error: -1,
  },
  status: {
    isLoggedIn: false,
    currentUser: '',
  },
};

export default function account(state = initialState, action) {
  switch(action.type) {
    /* LOGIN */
    case types.ACCOUNT_SIGNIN:
      console.log('reducer : signin');
      return update(state, {
        login: {
          status: { $set: 'WAITING' },
          error: { $set: -1 },
        }
      });
    case types.ACCOUNT_SIGNIN_SUCCESS:
      console.log('reducer : success');
      return update(state, {
        login: {
          status: { $set: 'SUCCESS' },
        },
        status: {
          isLoggedIn: { $set: true },
          currentUser: { $set: action.id },
        }
      });
    case types.ACCOUNT_SIGNIN_FAILURE:
    console.log('reducer : fail');
      return update(state, {
        login: {
          status: { $set: 'FAILURE' },
          error: { $set: action.error },
        }
      });
      case types.ACCOUNT_SIGNUP:
      return update(state, {
        register: {
          status: { $set: 'WAITING' },
          error: { $set: -1 },
        }
      });
    case types.ACCOUNT_SIGNUP_SUCCESS:
      return update(state, {
        register: {
          status: { $set: 'SUCCESS' }
        },
        status: {
          isLoggedIn: { $set: true },
          currentUser: { $set: action.id },
        }
      });
    case types.ACCOUNT_SIGNUP_FAILURE:
      return update(state, {
        register: {
          status: { $set: 'FAILURE' },
          error: { $set: action.error }
        }
      });

    default:
      return state;
  }
}