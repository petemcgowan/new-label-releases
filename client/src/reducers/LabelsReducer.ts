import {
  SEARCH_LABELS,
  DELETE_LABEL,
  ADD_LABEL,
  LABELS_ERROR,
} from "../actions/types";
import { IAction } from "../types/interfaces";

export interface ILabel {
  id?: string;
  emailAddress: string;
  labelName: string;
}

export const labelsInitialState = {
  labels: [],
  error: null,
  loading: false,
};

export interface ILabelsInitialState {
  labels: ILabel[];
  error: any;
  loading: boolean;
}

export default (
  state: ILabelsInitialState = labelsInitialState,
  action: IAction
) => {
  switch (action.type) {
    case SEARCH_LABELS:
      return {
        ...state,
        loading: false,
        labels: action.payload.data,
      };
    case DELETE_LABEL:
      return {
        ...state,
        labels: state.labels.filter((label) => label.id !== action.payload),
      };
    case ADD_LABEL:
      return {
        ...state,
        labels: [...state.labels, action.payload.data],
      };
    case LABELS_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};
