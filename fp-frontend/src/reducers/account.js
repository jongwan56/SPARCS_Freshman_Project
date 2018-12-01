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
    valid: false,
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
    case types.ACCOUNT_GET_STATUS:
      return update(state, {
          status: {
              isLoggedIn: { $set: true }
          }
      });
    case types.ACCOUNT_GET_STATUS_SUCCESS:
      return update(state, {
          status: {
              valid: { $set: true },
              currentUser: { $set: action.id }
          }
      });
    case types.ACCOUNT_GET_STATUS_FAILURE:
      return update(state, {
          status: {
              valid: { $set: false },
              isLoggedIn: { $set: false }
          }
      });
    case types.ACCOUNT_SIGNOUT:
      return update(state, {
          status: {
              isLoggedIn: { $set: false },
              currentUser: { $set: '' }
          }
      });
    default:
      return state;
  }
}