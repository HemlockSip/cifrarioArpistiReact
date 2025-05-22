// src/hooks/useAppState.js
import { useReducer, useCallback } from 'react';

const initialState = {
  selectedMessage: null,
  currentView: 'list', // 'list', 'key', 'decrypted', 'error'
  decryptedContent: '',
  keyInput: '',
};

const actionTypes = {
  SELECT_MESSAGE: 'SELECT_MESSAGE',
  SET_VIEW: 'SET_VIEW',
  SET_DECRYPTED_CONTENT: 'SET_DECRYPTED_CONTENT',
  SET_KEY_INPUT: 'SET_KEY_INPUT',
  RESET: 'RESET',
};

function appReducer(state, action) {
  switch (action.type) {
    case actionTypes.SELECT_MESSAGE:
      return {
        ...state,
        selectedMessage: action.payload,
        currentView: 'key',
        keyInput: '',
      };
    
    case actionTypes.SET_VIEW:
      return {
        ...state,
        currentView: action.payload,
      };
    
    case actionTypes.SET_DECRYPTED_CONTENT:
      return {
        ...state,
        decryptedContent: action.payload,
        currentView: 'decrypted',
      };
    
    case actionTypes.SET_KEY_INPUT:
      return {
        ...state,
        keyInput: action.payload,
      };
    
    case actionTypes.RESET:
      return {
        ...initialState,
      };
    
    default:
      return state;
  }
}

export function useAppState() {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const actions = {
    selectMessage: useCallback((message) => {
      dispatch({ type: actionTypes.SELECT_MESSAGE, payload: message });
    }, []),

    setView: useCallback((view) => {
      dispatch({ type: actionTypes.SET_VIEW, payload: view });
    }, []),

    setDecryptedContent: useCallback((content) => {
      dispatch({ type: actionTypes.SET_DECRYPTED_CONTENT, payload: content });
    }, []),

    setKeyInput: useCallback((input) => {
      dispatch({ type: actionTypes.SET_KEY_INPUT, payload: input });
    }, []),

    reset: useCallback(() => {
      dispatch({ type: actionTypes.RESET });
    }, []),
  };

  return {
    state,
    actions,
  };
}