
import {createAction, props} from "@ngrx/store";

export const loginUser = createAction('[API] Login', props<{ username: string, password: string }>());
export const loginUserSuccess = createAction('[API] Login Success', props<{ username: string, password: string }>());
export const loginUserFailure = createAction('[API] Login Failure', props<{ error: string }>());