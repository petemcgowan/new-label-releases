import React, { createContext, useReducer } from "react";
import { RCState, initialRCState } from "./RCState";
import { RCActions } from "./RCActions";
import { rcReducer } from "./RCReducer";



export const RCContext = createContext<{
  stateRC: RCState;
  dispatchRC: React.Dispatch<RCActions>;
}>({
  stateRC: initialRCState,
  dispatchRC: () => undefined,
});

interface Props {
  children?: any
}

export const RCContextProvider = ({ children }:Props) => {
    const [stateRC, dispatchRC] = useReducer(rcReducer, initialRCState);

    return (
      <RCContext.Provider value={{ stateRC, dispatchRC }}>
        {children}
      </RCContext.Provider>
    );
  };

