import React, { createContext, useReducer, useEffect } from "react";
import { initialState, ReleaseReducer } from "../reducers/ReleaseReducer";

export const ReleaseContext = createContext();

const ReleaseContextProvider = (props) => {
  const [state, dispatch] = useReducer(ReleaseReducer, initialState);

  // const [state, dispatch] = useReducer(ReleaseReducer, [], async () => {
  //   const localData = localStorage.getItem("NLRreleases");

  //   return localData ? JSON.parse(localData) : [];
  // });

  // useEffect(() => {
  //   localStorage.setItem("NLRreleases", JSON.stringify(state.releases));
  // }, [state.releases]);
  return (
    <ReleaseContext.Provider value={{ state, dispatch }}>
      {props.children}
    </ReleaseContext.Provider>
  );
};

export default ReleaseContextProvider;
