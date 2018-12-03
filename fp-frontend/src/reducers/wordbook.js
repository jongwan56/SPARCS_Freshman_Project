import * as types from 'actions/ActionTypes';
import update from 'react-addons-update';

const initialState = {
  post: {
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