import React, { createContext, useReducer, useState, useEffect } from 'react';
import { setLocalStorage, getLocalStorage } from '../services/local-storage';

const AppContext = createContext();

// PROPOSAL: Use Context Provider to store global state
export const AppProvider = ({ children }) => {
  const appStateFromLocalStorage = getLocalStorage('appState', {});
  const appInitialState = {
    loggedUser: appStateFromLocalStorage.loggedUser || {},
    isAuth: appStateFromLocalStorage.isAuth || false,
    userPref: appStateFromLocalStorage.userPref || {},
  };

  function reducer(state, action) {
    switch (action.type) {
      case 'login':
        return { ...state, loggedUser: action.payload, isAuth: true };
      case 'logout':
        return { ...state, loggedUser: {}, isAuth: false };
      case 'update-pref':
        return {
          ...state,
          userPref: { ...state.userPref, ...action.userPref },
        };
      default:
        throw new Error();
    }
  }

  // persistent states
  const [appState, dispatch] = useReducer(reducer, appInitialState);
  const [showLoginModal, setShowLoginModal] = useState(false);

  // provide these setters to children
  const setLoggedUser = (user) => {
    dispatch({ type: 'login', payload: user });
    setShowLoginModal(false);
  };

  const remLoggedUser = () => {
    dispatch({ type: 'logout' });
  };

  const setUserPref = (userPref) => {
    dispatch({ type: 'update-pref', payload: userPref });
  };

  useEffect(() => {
    setLocalStorage('appState', appState);
  }, [appState]);

  return (
    <AppContext.Provider
      value={{
        loggedUser: appState.loggedUser,
        isAuth: appState.isAuth,
        setLoggedUser,
        remLoggedUser,

        userPref: appState.userPref,
        setUserPref,

        showLoginModal,
        setShowLoginModal,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
