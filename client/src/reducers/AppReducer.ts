import { getEmail } from "../utils/helpers";

import { GET_LOGGED_IN_EMAIL, ADD_LOGGED_IN_EMAIL } from "../actions/types";

const initialState = {
  loading: false,
  loggedInEmail: getEmail(),
};

export default (state = initialState, action: any) => {
  switch (action.type) {
    case GET_LOGGED_IN_EMAIL:
      return {
        ...state,
        loading: false,
        loggedInEmail: action.payload,
      };
    case ADD_LOGGED_IN_EMAIL:
      return {
        ...state,
        loading: false,
        loggedInEmail: action.payload,
      };
    default:
      return state;
  }
};
