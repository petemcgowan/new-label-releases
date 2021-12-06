import { IRecord, RCState, initialRCState } from "./RCState";
import { ActionType, Add, RCActions, Search, Delete, Error } from "./RCActions";
import axios from "axios";
import { getEmail } from "../utils/helpers";

export function rcReducer(state: RCState, action: RCActions): RCState {
  console.log(
    "RCReducer(GEN), rcReducer(before), state:" + JSON.stringify(state)
  );
  console.log(
    "RCReducer(GEN), rcReducer(before), action.payload:" +
      JSON.stringify(action.payload)
  );
  switch (action.type) {
    case ActionType.Add:
      console.log(
        "RCReducer(ADD), rcReducer(before), state:" + JSON.stringify(state)
      );
      console.log(
        "RCReducer(ADD), rcReducer(before), action.payload:" +
          JSON.stringify(action.payload)
      );
      return { ...state, recordCrate: [action.payload, ...state.recordCrate] };
    case ActionType.Search:
      console.log(
        "RCReducer, rcReducer(before), state:" + JSON.stringify(state)
      );
      console.log(
        "RCReducer, rcReducer(before), action.payload:" +
          JSON.stringify(action.payload)
      );
      console.log(action.payload);
      return {
        ...initialRCState,
        recordCrate: action.payload,
        loading: false,
      };
    case ActionType.Delete:
      console.log(
        "RCReducer(DELETE), rcReducer(before), state:" + JSON.stringify(state)
      );
      console.log(
        "RCReducer(DELETE), rcReducer(before), action.payload:" +
          JSON.stringify(action.payload)
      );
      return {
        ...state,
        recordCrate: state.recordCrate.filter(
          (crateItem) => crateItem.id !== action.payload.id
        ),
      };
    case ActionType.Error:
      // TODO: Can't remember what to do with this, come back to it
      return state;
    default:
      return state;
  }
}

// helper functions to simplify the caller
export const searchRecord = (records: IRecord[]): Search => ({
  type: ActionType.Search,
  payload: records,
});

export const addRecord = (record: IRecord): Add => ({
  type: ActionType.Add,
  payload: record,
});

export const deleteRecord = (id: string): Delete => ({
  type: ActionType.Delete,
  payload: { id },
});

export const errorRecord = (error: string): Error => ({
  type: ActionType.Error,
  payload: { error },
});
