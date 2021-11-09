import reduxAuthStore from "../reduxAuthStore";

export function getEmail() {
  const localEmail = localStorage.getItem("NLRemail");
  console.log("getEmail, localEmail" + JSON.stringify(localEmail));

  const state = reduxAuthStore.getState();
  var email = "";
  if (
    state.auth !== undefined &&
    state.auth !== null &&
    state.auth.user !== undefined &&
    state.auth.user !== null
  ) {
    console.log(
      "getEmail, setting email to state.user.email" +
        JSON.stringify(state.auth.user.email)
    );
    email = state.auth.user.email;
  } else if (
    localEmail !== undefined &&
    localEmail !== null &&
    localEmail !== ""
  ) {
    console.log(
      "getEmail, setting email to local storage version:" + localEmail
    );
    email = localEmail;
  }
  console.log("getEmail, state" + JSON.stringify(state));
  //Pete Removing hack
  return email;
  // return "Jun19@gmail.com";
}
