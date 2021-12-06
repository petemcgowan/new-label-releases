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


export const RCContextProvider: React.FC<React.ReactNode> = ({ children }) => {
    const [stateRC, dispatchRC] = useReducer(rcReducer, initialRCState);

    return (
      <RCContext.Provider value={{ stateRC, dispatchRC }}>
        {children}
      </RCContext.Provider>
    );
  };

