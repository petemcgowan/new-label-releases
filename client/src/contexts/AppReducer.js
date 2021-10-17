export default (state, action) => {
  switch(action.type) {

    case 'GET_LOGGED_IN_EMAIL':
      return {
        ...state,
        loading: false,
        loggedInEmail: action.payload
      }
    case 'ADD_LOGGED_IN_EMAIL':
      return {
        ...state,
        loading: false,
        loggedInEmail: action.payload
      }
    default:
      return state;
  }
}