import {
    WORDBOOK_LIST,
    WORDBOOK_LIST_SUCCESS,
    WORDBOOK_LIST_FAILURE,
    WORD_CHECK_PUT,
    WORD_CHECK_PUT_SUCCESS,
    WORD_CHECK_PUT_FAILURE,
} from './ActionTypes'

import axios from 'axios';


export function wordCheckPutRequest(wordId, checkState) {
  return async (dispatch) => {
    dispatch(wordCheckPut());

    try {
      const success = await axios.put('/api/wordbook/check', { wordId, checkState });
      console.log(success);
      dispatch(wordCheckPutSuccess());
    } catch (error) {
      console.log('fail');
      dispatch(wordCheckPutFailure(error.response.data.code));
    }
  }
}

export function wordCheckPut() {
  return {
      type: WORD_CHECK_PUT,
  };
}

export function wordCheckPutSuccess() {
  return {
      type: WORD_CHECK_PUT_SUCCESS,
  };
}

export function wordCheckPutFailure(error) {
  return {
      type: WORD_CHECK_PUT_FAILURE,
      error,
  };
}

export function wordbookListRequest() {
  return (dispatch) => {
    dispatch(wordbookList());
    
    let url = '/api/wordbook';
    
    /* url setup depending on parameters,
      to  be implemented.. */
      
    return axios.get(url)
    .then(async (response) => {
      console.log(response.data.wordbooks)
      const send = [];
      for (let i=0; i<response.data.wordbooks.length; i++) {
        const rp = await axios.get(`/api/wordbook/${response.data.wordbooks[i]}`);
        console.log(rp.data);
        const chs = [];
        for (let j=0; j<rp.data.chapters.length; j++) {
          const ch = await axios.get(`/api/wordbook/chapter/${rp.data.chapters[j]}`);
          console.log(ch.data);
          chs.push(ch.data.chapter);
        }
        rp.data.chapters = chs;
        send.push(rp.data);
      }
      // dispatch(wordbookListSuccess(response.data.wordbooks));
      console.log(send);
      dispatch(wordbookListSuccess(send));
    }).catch((error) => {
      dispatch(wordbookListFailure());
    });
  };
}

export function wordbookList() {
    return {
        type: WORDBOOK_LIST
    };
}

export function wordbookListSuccess(wordbooks) {
    return {
        type: WORDBOOK_LIST_SUCCESS,
        wordbooks,
    };
}

export function wordbookListFailure() {
    return {
        type: WORDBOOK_LIST_FAILURE
    };
}