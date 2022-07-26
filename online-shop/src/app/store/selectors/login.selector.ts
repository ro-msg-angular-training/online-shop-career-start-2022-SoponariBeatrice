import {AppState} from "../state/app.state";
import {createSelector} from "@ngrx/store";
import { LoginState } from "../state/login.state";


export const selectLoginState = (state: AppState) => state.login;

export const selectLoginUser = createSelector(selectLoginState, (state: LoginState) => {state.username, state.password});