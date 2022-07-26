import {initialLoginState} from "../state/login.state";
import {createReducer, on} from "@ngrx/store";
import {loginUser, loginUserFailure, loginUserSuccess} from "../actions/login.action";

export const loginReducer = createReducer(
  initialLoginState,

  on(loginUser, (state) => ({
    ...state,
    loading: true,
  })),

  on(loginUserSuccess, (state, { username, password }) => ({
    ...state,
    username: username,
    password: password,
    status: "success",
    error: "",
  })),

  on(loginUserFailure, (state) => ({
    ...state,
    status: "error",
    error: "",
  }))
);