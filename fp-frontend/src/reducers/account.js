import * as types from 'actions/ActionTypes';
import update from 'react-addons-update';

const initialState = {
  login: {
    status: 'INIT'
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
          status: { $set: 'WAITING' }
        }
      });
    case types.ACCOUNT_SIGNIN_SUCCESS:
      console.log('reducer : success');
      return update(state, {
        login: {
          status: { $set: 'SUCCESS' }
        },
        status: {
          isLoggedIn: { $set: true },
          currentUser: { $set: action.id }
        }
      });
    case types.ACCOUNT_SIGNIN_FAILURE:
    console.log('reducer : fail');
      return update(state, {
        login: {
          status: { $set: 'FAILURE' }
        }
      });
    default:
      return state;
  }
}