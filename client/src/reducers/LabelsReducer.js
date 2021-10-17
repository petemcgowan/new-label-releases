export default (state, action) => {
  switch (action.type) {
    case "SEARCH_LABELS":
      return {
        ...state,
        loading: false,
        labels: action.payload,
      };
    case "DELETE_LABEL":
      return {
        ...state,
        labels: state.labels.filter((label) => label.id !== action.payload),
      };
    case "ADD_LABEL":
      return {
        ...state,
        labels: [...state.labels, action.payload],
      };
    case "LABELS_ERROR":
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};
