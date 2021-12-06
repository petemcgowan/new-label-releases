import { IRecord, AxiosResponseArray, AxiosResponseObject } from "./RCState";
import axios from "axios";
import { getEmail } from "../utils/helpers";
import {
  searchRecord,
  addRecord,
  deleteRecord,
  errorRecord,
} from "./RCReducer";

export enum ActionType {
  Search,
  Add,
  Delete,
  Error,
}

export interface Search {
  type: ActionType.Search;
  payload: IRecord[];
}

export interface Add {
  type: ActionType.Add;
  payload: IRecord;
}

export interface Delete {
  type: ActionType.Delete;
  payload: { id: string };
}

export interface Error {
  type: ActionType.Error;
  payload: { error: string };
}

// // Set Loading
// export const setLoading = (dispatch, status) =>
//   dispatch({ type: "SET_LOADING", payload: status });

// // Set Error
// export const setError = (dispatch, error) =>
//   dispatch({
//     type: "SET_ERROR",
//     payload: { error: error.status, message: error.message },
//   });

export const searchAxiosRecord = async (
  dispatchRC: (arg0: Search | Error) => void
) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    console.log("searchAxiosRecord, getEmail():" + getEmail());
    const res: AxiosResponseArray = await axios.post(
      "/recordCrates/search",
      { emailAddress: getEmail() },
      config
    );
    console.log(
      "searchAxiosRecord, res.data.data:" + JSON.stringify(res.data.data)
    );

    dispatchRC(searchRecord(res.data.data));
  } catch (err: any) {
    console.log("searchAxiosRecord, err:" + err);
    dispatchRC(errorRecord(err.response.data.error));
  }
};

export const addAxiosRecord = async (
  dispatchRC: (arg0: Error | Add) => void,
  record: IRecord
) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    console.log(
      "addAxiosRecord, artists/releaseName/emailAddress:" +
        record.artists +
        record.releaseName +
        record.trackName +
        record.emailAddress
    );
    const res: AxiosResponseObject = await axios.post(
      "/recordCrates/add",
      {
        emailAddress: record.emailAddress,
        artists: record.artists,
        releaseName: record.releaseName,
        trackName: record.trackName,
      },
      config
    );

    console.log("addAxiosRecord, res.data:" + JSON.stringify(res.data.data));

    dispatchRC(addRecord(res.data.data));
  } catch (err: any) {
    console.log("addAxiosRecord, err:" + err);
    dispatchRC(errorRecord(err.response.data.error));
  }
};

// Note :Prettier will likely remove the brackets but dispatch is a parameter!
export const deleteAxiosRecord = async (
  dispatchRC: (arg0: Error | Delete) => void,
  id: string
) => {
  try {
    console.log("deleteAxiosRecord, id:" + id);

    await axios.delete(`/recordCrates/${id}`);

    dispatchRC(deleteRecord(id));
  } catch (err: any) {
    console.log("deleteAxiosRecord, err:" + err);
    dispatchRC(errorRecord(err.response.data.error));
  }
};

export type RCActions = Search | Add | Delete | Error;
