import * as types from 'actions/ActionTypes';
import update from 'react-addons-update';

const initialState = {
  put: {
      status: 'INIT',
      error: -1
  },
  list: {
      status: 'INIT',
      wordbooks: [],
  }
};

export default function wordbook(state, action) {
  /* CODES */
  if(typeof state === "undefined") {
    state = initialState;
  }
  switch(action.type) {
    case types.WORD_CHECK_PUT:
      return update(state, {
        put: {
          status: { $set: 'WAITING' },
          error: { $set: -1 },
        }
      });
    case types.WORD_CHECK_PUT_SUCCESS:
      return update(state, {
        put: {
          status: { $set: 'SUCCESS' }
        }
      });
    case types.WORD_CHECK_PUT_FAILURE:
      return update(state, {
        put: {
          status: { $set: 'FAILURE' },
          error: { $set: action.error }
        }
      });
    /* CODES */
    case types.WORDBOOK_LIST:
      return update(state, {
        list: {
          status: { $set: 'WAITING' },
        }
      });
    case types.WORDBOOK_LIST_SUCCESS: 
      // if(action.isInitial) {
        
      // }
      return update(state, {
        list: {
          status: { $set: 'SUCCESS' },
          wordbooks: { $set: action.wordbooks },
        }
      });
    case types.WORDBOOK_LIST_FAILURE:
      return update(state, {
        list: {
          status: { $set: 'FAILURE' }
        }
      })
    default:
      return state;
  }
}