import React, { createContext, useReducer } from "react";
import RecordCrateReducer from "../reducers/RecordCrateReducer";
import axios from "axios";
import { getEmail } from "../utils/helpers";

// Initial state
const initialState = {
  recordCrate: [],
  error: null,
  loading: true,
};

// Create context
export const RecordCrateContext = createContext(initialState);

// Provider component
export const RecordCrateProvider = ({ children }) => {
  const [state, dispatchCrate] = useReducer(RecordCrateReducer, [], () => {
    const crateData = searchRecordCrate();
    console.log("RecordCrateState:" + crateData);
    return crateData ? crateData : [];
  });

  async function searchRecordCrate() {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      console.log("searchRecordCrate, getEmail():" + getEmail());
      const res = await axios.post(
        "/recordCrates/search",
        { emailAddress: getEmail() },
        config
      );
      console.log(
        "RecordCrateContext/State, searchRecordCrate():" +
          JSON.stringify(res.data.data)
      );

      dispatchCrate({
        type: "SEARCH_RECORD_CRATE",
        payload: res.data.data,
      });
    } catch (err) {
      console.log("searchRecordCrate, err:" + err);
      dispatchCrate({
        type: "RECORD_CRATE_ERROR",
        payload: err.response.data.error,
      });
    }
  }

  async function deleteRecordCrate(id) {
    try {
      console.log("deleteRecordCrate, id:" + id);

      await axios.delete(`/recordCrates/${id}`);

      dispatchCrate({
        type: "DELETE_RECORD_CRATE",
        payload: id,
      });
    } catch (err) {
      console.log("deleteRecordCrate, err:" + err);
      dispatchCrate({
        type: "RECORD_CRATE_ERROR",
        payload: err.response.data.error,
      });
    }
  }

  async function addRecordCrate(artists, releaseName, trackName, emailAddress) {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      console.log(
        "addRecordCrate, artists/releaseName/emailAddress:" +
          artists +
          releaseName +
          trackName +
          emailAddress
      );
      const res = await axios.post(
        "/recordCrates/add",
        {
          emailAddress: emailAddress,
          artists: artists,
          releaseName: releaseName,
          trackName: trackName,
        },
        config
      );
      console.log("addRecordCrate, res.data:" + JSON.stringify(res.data));

      dispatchCrate({
        type: "ADD_RECORD_CRATE",
        payload: res.data.data,
      });
    } catch (err) {
      console.log("addRecordCrate, err:" + err);
      dispatchCrate({
        type: "RECORD_CRATE_ERROR",
        payload: err.response.data.error,
      });
    }
  }

  return (
    <RecordCrateContext.Provider
      value={{
        recordCrate: state.recordCrate,
        error: state.error,
        loading: state.loading,
        // currentSongId: state.currentSongId,
        // currentTime: state.currentTime,
        // duration: state.duration,
        // playing: state.playing,
        // volume: state.volume,

        // dispatchCrate,
        searchRecordCrate,
        addRecordCrate,
        deleteRecordCrate,
      }}
    >
      {children}
    </RecordCrateContext.Provider>
  );
};
