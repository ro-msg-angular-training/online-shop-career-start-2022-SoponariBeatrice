export interface LoginState {
    username: string,
    password: string,
    error: string | null,
    status: 'pending'|'loading'|'error'|'success'
  }
  
  export const initialLoginState: LoginState = {
    username: "",
    password: "",
    status: "pending",
    error: "",
  };