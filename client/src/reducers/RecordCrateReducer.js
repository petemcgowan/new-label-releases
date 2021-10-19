export default (state, action) => {
  switch(action.type) {
    case 'SEARCH_RECORD_CRATE':
      return {
        ...state,
        loading: false,
        recordCrate: action.payload
      }
    case 'DELETE_RECORD_CRATE':
      return {
        ...state,
        recordCrate: state.recordCrate.filter(crateItem => crateItem.id !== action.payload)
      }
    case 'ADD_RECORD_CRATE':
      return {
        ...state,
        recordCrate: [...state.recordCrate, action.payload]
      }
    case 'RECORD_CRATE_ERROR':
      return {
        ...state,
        error: action.payload
      }
    default:
      return state;
  }
}
