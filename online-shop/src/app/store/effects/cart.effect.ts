import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { concatMap, map } from "rxjs";
import { CartService } from "src/app/service/cart.service";
import { checkout, checkoutSuccess } from "../actions/cart.action";

@Injectable()
export class OrderEffects {
  constructor(
    private cartService: CartService,
    private actions$: Actions,
    private router: Router
  ) {
  }
checkout$ = createEffect(() =>
    this.actions$.pipe(
        ofType(checkout),
        concatMap((data) => this.cartService.checkout().pipe(map(
            () => checkoutSuccess()
        )))
    )
);

}