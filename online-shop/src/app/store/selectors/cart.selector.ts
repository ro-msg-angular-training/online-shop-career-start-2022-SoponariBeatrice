import { createSelector } from "@ngrx/store";
import { AppState } from "../state/app.state";
import { CartState } from "../state/cart.state";

export const selectCart = (state: AppState) => state.cart;

export const selectAllCart = createSelector(
    selectCart,
    (state: CartState) => state.products
);