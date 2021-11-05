import React, { createContext, useReducer } from "react";
import AppReducer from "../reducers/AppReducer";
import reduxAuthStore from "../reduxAuthStore";

import { ADD_LOGGED_IN_EMAIL, GLOBAL_ERROR } from "../actions/types";

// Initial state
const initialState = {
  loggedInEmail: null, // TODO: hard-coded for testing, populate at log in instead
  error: null,
  loading: true,
};

// Create context
// export const GlobalContext = createContext(initialState);
// TODO:  In the conversion to Typescript I ditched passing initialState, so keep an eye on this, I assume it needs it?
export const GlobalContext = createContext<GlobalContextType | null>(null);

export const GlobalProvider: React.FC<React.ReactNode> = ({ children }) => {
// Provider component
// export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  async function getLoggedInEmail() {
    // try {
      // const state = reduxAuthStore.getState();
      const auth = reduxAuthStore.getState().auth;
      var email = "";
      if (auth.user != null) {
        email = auth.user.email;
      }
      console.log("getLoggedInEmail, state" + JSON.stringify(state));
      // console.log("getLoggedInEmail, state.user" + JSON.stringify(state.user));
      return email;
    /*}
     .catch(err => {
       dispatch(
         returnErrors(err.response.data, err.response.status, 'REGISTER_FAIL')
       );
       dispatch({
         type: REGISTER_FAIL
       });
     });

    /*catch (err) {
      dispatch({
        type: GLOBAL_ERROR,
        payload: err.response.data.error,
      });
    }*/
  }

  // Actions
  async function addLoggedInEmail(email: string) {
    // try {
      dispatch({
        type: ADD_LOGGED_IN_EMAIL,
        payload: email,
      });
     /*} catch (err: ) {
       dispatch({
         type: GLOBAL_ERROR,
         payload: err.response.data.error,
       });
     }*/
  }

  return (
    <GlobalContext.Provider
      value={{
        loggedInEmail: state.loggedInEmail, // TODO: is this right?
        // transactions: state.transactions,
        // error: state.error,
        loading: state.loading,
        addLoggedInEmail,
        getLoggedInEmail,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
