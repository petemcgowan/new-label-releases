import React, { createContext, useReducer } from "react";
import LabelsReducer, {
  ILabelsInitialState,
  labelsInitialState
} from "../reducers/LabelsReducer";
import axios from "axios";
import { getEmail } from "../utils/helpers";

import {
  SEARCH_LABELS,
  DELETE_LABEL,
  ADD_LABEL,
  LABELS_ERROR,
} from "../actions/types";


export const LabelsContext = createContext<{
  state: ILabelsInitialState;
  dispatchLabels: React.Dispatch<any>;
  searchLabels: React.Dispatch<any>;
  addLabel: React.Dispatch<any>;
  deleteLabel: React.Dispatch<any>;
}>({
  state: labelsInitialState,
  dispatchLabels: () => null,
  searchLabels: () => null,
  addLabel: () => null,
  deleteLabel: () => null
});

// Create context
// export const LabelsContext = createContext(labelsInitialState);
interface Props {
  children?: any
}
export const LabelsProvider = ({ children }:Props)  => {
// Provider component
// export const LabelsProvider = ({ children }) => { //ReleaseReducer, initialReleaseState
//  const labelsInitialState = () => {
//   let labelData = searchLabels();
//   console.log("LabelsContext:" + labelData);
//   if (!labelData)
//     labelData = [];
//   return labelData ? labelData : [];
// };
  const [state, dispatchLabels] = useReducer(LabelsReducer, labelsInitialState);

  // Pete todo considered renaming this to getLabels, it's only kind of searching (on email).  It's not Google
   async function searchLabels() {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      console.log("searchLabels, getEmail():" + getEmail());
      const res = await axios.post(
        "/labels/search",
        { emailAddress: getEmail() },
        config
      );
      console.log(
        "LabelsContext/State, searchLabels():" + JSON.stringify(res.data)
      );

      dispatchLabels({
        type: SEARCH_LABELS,
        payload: res.data,
      });
    } catch (err: any) {
      console.log("searchLabels, err:" + err);

      dispatchLabels({
        type: LABELS_ERROR,
        payload: err.response.data.error,
      });
    }
  }

  async function deleteLabel(id: string) {
    try {
      console.log("deleteLabel, id:" + id);

      await axios.delete(`/labels/${id}`);

      dispatchLabels({
        type: DELETE_LABEL,
        payload: id,
      });
    } catch (err: any) {
      console.log("deleteLabels, err:" + err);
      dispatchLabels({
        type: LABELS_ERROR,
        payload: err.response.data.error,
      });
    }
  }

  async function addLabel(labelName: string) {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      console.log(
        "addLabel, labelName:" +
          JSON.stringify(labelName) +
          ", emailAddress:" +
          JSON.stringify(getEmail())
      );
      const res = await axios.post(
        "/labels/add",
        { emailAddress: getEmail(), labelName: labelName },
        config
      );
      console.log("addLabel, res.data:" + JSON.stringify(res.data));

      dispatchLabels({
        type: ADD_LABEL,
        payload: res.data,
      });
    } catch (err: any) {
      console.log("addLabel, err:" + err);
      dispatchLabels({
        type: LABELS_ERROR,
        payload: err.response.data.error,
      });
    }
  }

  return (
    <LabelsContext.Provider
    value={{ state, dispatchLabels, searchLabels, addLabel, deleteLabel    }}
      // value={{
      //   labels: state.labels,
      //   error: state.error,
      //   loading: state.loading,
      //   searchLabels,
      //   addLabel,
      //   deleteLabel,
      // }}
    >
      {children}
    </LabelsContext.Provider>
  );
};
