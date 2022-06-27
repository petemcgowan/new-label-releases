import axios from "axios";
import { returnErrors } from "./errorActions";
import reduxAuthStore from "../reduxAuthStore";
import {
  USER_LOADED,
  USER_LOADING,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
} from "./types";
import { IAuthFunction, IConfigHeaders } from "../types/interfaces";

// interface RegUser {
//   token: string;
//   user: number;
//   id: string;
//   name: string;
//   email: string;
// }

// interface ServerData {
//   token: string;
//   user: RegUser;
// }

// Register User
export const register =
  ({ name, email, password }: IAuthFunction) =>
  (dispatch: Function) => {
    // Headers
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    // Request body
    const body = JSON.stringify({ name, email, password });
    console.log("authAction, register, calling axios-/users");
    // const url = "/users";
    axios
      .post("/users", body, config)
      .then((res) => {
        console.log(
          `Successful return from register user, data${JSON.stringify(
            res.data
          )}`
        );
        // localStorage.setItem("NLRemail", data.user.email);
        dispatch({
          type: REGISTER_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(`authAction, register, err:${err}`);
        dispatch(
          returnErrors(err.response.data, err.response.status, REGISTER_FAIL)
        );
        dispatch({
          type: REGISTER_FAIL,
        });
      });
  };

// Check token & load user
export const loadUser =
  () => async (dispatch: Function, getState: Function) => {
    console.log(`authAction, getState1:${JSON.stringify(getState)}`);
    console.log(
      `authAction, getState1().auth:${JSON.stringify(getState().auth)}`
    );

    const { auth } = reduxAuthStore.getState();
    console.log(`loadUser, auth.user:${JSON.stringify(auth.user)}`);
    let userID = -1;
    if (auth.user) {
      // it's initially null
      console.log(`loadUser, auth.user.id:${auth.user.id}`);
      userID = auth.user.id;
    }

    interface IUserObj {
      email: string;
    }

    interface ResponseDataUser {
      success: boolean;
      count: number;
      data: IUserObj;
    }

    interface AxiosResponseUser {
      data: ResponseDataUser;
      status: number;
      statusText: string;
      headers: string;
      config: string;
      request: string;
    }

    // User loading
    dispatch({ type: USER_LOADING });
    console.log("authAction, loadUser, calling axios-auth/user");
    // PETE  NOTE: I'm changing this get to a post, cause I need to pass the user id
    const res: AxiosResponseUser = await axios.post(
      "/auth/user",
      { userID },
      tokenConfig(getState)
      // {
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      // }
    );
    // .

    // then((res: AxiosResponseUser) => {
    console.log(
      `loadUser...need to set email in context, res.data:${JSON.stringify(
        res.data
      )}`
    );
    if (res.data) {
      const { email } = res.data.data;
      console.log(
        `loadUser, setting Local Storage email:${JSON.stringify(email)}`
      );

      localStorage.setItem("NLRemail", email);

      dispatch({
        type: USER_LOADED,
        payload: email,
      });
    }
    console.log(`authAction, loadUser, getState2:${JSON.stringify(getState)}`);
    console.log(
      `authAction, loadUser, getState2().auth:${JSON.stringify(
        getState().auth
      )}`
    );
    // })
    // .catch((err) => {
    //   console.log("authAction, loadUser:" + err);
    //   dispatch(returnErrors(err.response.data, err.response.status));
    //   dispatch({
    //     type: AUTH_ERROR,
    //   });
    // });
  };

// Login User
export const login =
  ({ email, password }: IAuthFunction) =>
  (dispatch: Function) => {
    // Headers
    console.log(
      `authAction, login, setting localStorage email${JSON.stringify(email)}`
    );
    localStorage.setItem("NLRemail", email);
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    // Request body
    const body = JSON.stringify({ email, password });

    console.log("authAction, login, calling axios-auth");
    axios
      .post("/auth", body, config)
      .then((res) => {
        console.log(`Successful login, res.data:${JSON.stringify(res.data)}`);

        dispatch({
          type: LOGIN_SUCCESS,
          payload: res.data,
        });
        console.log(
          `login should have updated auth.user:${JSON.stringify(
            reduxAuthStore.getState().auth.user
          )}`
        );
      })
      .catch((err) => {
        console.log(`authAction, login:${err}`);

        dispatch(
          returnErrors(err.response.data, err.response.status, LOGIN_FAIL)
        );
        dispatch({
          type: LOGIN_FAIL,
        });
      });
  };

// Logout User
export const logout = () => {
  console.log("authActions, logout, setting MLRemail to blank");
  localStorage.setItem("NLRemail", "");
  return {
    type: LOGOUT_SUCCESS,
  };
};

// Setup config/headers and token
export const tokenConfig = (getState: Function) => {
  // Get token from localstorage
  const { token } = getState().auth;

  // Headers
  const config: IConfigHeaders = {
    headers: {
      "Content-type": "application/json",
    },
  };

  // If token, add to headers
  if (token) {
    config.headers["x-auth-token"] = token;
  }

  return config;
};
