import React, { createContext, useReducer } from "react";
import LabelsReducer from "../reducers/LabelsReducer";
import axios from "axios";
import { getEmail } from "../utils/helpers";

// Initial state
const initialState = {
  labels: [],
  error: null,
  loading: true,
};

// Create context
export const LabelsContext = createContext(initialState);

// Provider component
export const LabelsProvider = ({ children }) => {
  const [state, dispatchLabels] = useReducer(LabelsReducer, [], () => {
    const labelData = searchLabels();
    console.log("LabelsState:" + labelData);
    return labelData ? labelData : [];
  });

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
        "LabelsContext/State, searchLabels():" + JSON.stringify(res.data.data)
      );

      dispatchLabels({
        type: "SEARCH_LABELS",
        payload: res.data.data,
      });
    } catch (err) {
      console.log("searchLabels, err:" + err);
      dispatchLabels({
        type: "LABELS_ERROR",
        payload: err.response.data.error,
      });
    }
  }

  async function deleteLabel(id) {
    try {
      console.log("deleteLabel, id:" + id);

      await axios.delete(`/labels/${id}`);

      dispatchLabels({
        type: "DELETE_LABEL",
        payload: id,
      });
    } catch (err) {
      console.log("deleteLabels, err:" + err);
      dispatchLabels({
        type: "LABELS_ERROR",
        payload: err.response.data.error,
      });
    }
  }

  async function addLabel(labelName) {
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
        type: "ADD_LABEL",
        payload: res.data.data,
      });
    } catch (err) {
      console.log("addLabel, err:" + err);
      dispatchLabels({
        type: "LABELS_ERROR",
        payload: err.response.data.error,
      });
    }
  }

  return (
    <LabelsContext.Provider
      value={{
        labels: state.labels,
        error: state.error,
        loading: state.loading,
        searchLabels,
        addLabel,
        deleteLabel,
      }}
    >
      {children}
    </LabelsContext.Provider>
  );
};
