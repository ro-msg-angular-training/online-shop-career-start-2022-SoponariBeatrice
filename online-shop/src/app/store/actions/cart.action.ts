import { createAction, props } from "@ngrx/store";
import { IProductWrapper } from "src/app/IProductWrapper";

export const loadCart = createAction('[Cart] Load Cart');

export const loadCartSuccess = createAction(
    '[API] Load Cart Success',
    props<{ products: IProductWrapper[]}>()
  );
  
  export const loadCartFailure = createAction(
    '[API] Load Cart Failure',
    props<{ error: string }>()
  );

  export const addToCart = createAction(
    '[Product] Add To Cart',
    props<{ product: IProductWrapper }>()
  )
  export const addToCartSuccess = createAction(
    '[API] Add To Cart Success',
    props<{ response: string }>()
  )

  export const addToCartFailure = createAction(
    '[API] Add To Cart Failure',
    props<{ error: string }>()
  );

  export const checkout = createAction('[API] Checkout');

  export const checkoutSuccess = createAction('[API] Checkout Success');
