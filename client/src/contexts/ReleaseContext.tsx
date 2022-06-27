import React, { createContext, useReducer, useEffect } from "react";
import {initialReleaseState, ReleaseReducer, IInitialReleaseState } from "../reducers/ReleaseReducer";

// Pete Todo: Use IRelease here if possible (same as I do in ReleaseReducer)
// type ReleaseType = {
//   id?: string;
//   artists: string[];
//   href: string;
//   releaseName: string;
//   trackName: string;
//   label: string;
//   durationMiSecs: string;
//   releaseDate: string;
//   albumType: string;
// }

// type InitialStateType = {
//   releases: ReleaseType[];
// }

// const initialState = {
//   releases: [],
// }
export const ReleaseContext = createContext<{
  state: IInitialReleaseState;
  dispatch: React.Dispatch<any>;
}>({
  state: initialReleaseState,
  dispatch: () => null
});

interface Props {
  children?: any
}
const ReleaseContextProvider = ({ children }:Props)  => {
  const [state, dispatch] = useReducer(ReleaseReducer, initialReleaseState);

  return (
    <ReleaseContext.Provider value={{ state, dispatch }}>
      {children}
    </ReleaseContext.Provider>
  );
};

export default ReleaseContextProvider;
