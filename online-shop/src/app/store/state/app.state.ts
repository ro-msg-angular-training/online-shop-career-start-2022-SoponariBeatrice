import { CartState } from "./cart.state";
import { LoginState } from "./login.state";
import { ProductState } from "./product.state";

export interface AppState {
    products: ProductState;
    cart: CartState;
    login: LoginState;
  }