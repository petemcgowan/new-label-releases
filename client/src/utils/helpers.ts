import reduxAuthStore from "../reduxAuthStore";

export const formatTime = (inputSeconds: number) => {
  const seconds: number = Math.floor(inputSeconds % 60); // e.g. 6 if input is 9

  const minutes = Math.floor(inputSeconds / 60);
  if (seconds < 10) return `${minutes}:0${seconds}`;
  // making sure its prepened by 0
  else return `${minutes}:${seconds}`;
};

export const handleProgress = (currentTime: number, duration: number) =>
  600 * (currentTime / duration);

export function getEmail() {
  const localEmail = localStorage.getItem("NLRemail");
  console.log("getEmail, localEmail" + JSON.stringify(localEmail));

  const state = reduxAuthStore.getState();
  let email = "";
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
