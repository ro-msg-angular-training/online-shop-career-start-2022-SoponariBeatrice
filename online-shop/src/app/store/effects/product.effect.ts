import { Injectable } from "@angular/core";
import { AppState } from "../state/app.state";
import { Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ProductService } from "src/app/service/product.service";
import { of, from } from 'rxjs';
import { switchMap, map, catchError, withLatestFrom, concatMap, mergeMap } from 'rxjs/operators';

import {
    addProduct,
    loadProducts,
    loadProductsSuccess,
    loadProductsFailure,
    addProductSuccess,
    addProductFailure,
    getProductById,
    getProductByIdSuccess,
    getProductByIdFailure,
    deleteProduct,
    deleteProductSuccess,
    updateProduct,
    updateProductSuccess,
    updateProductFailure
}   from  '../actions/product.action'
import { create } from "lodash";
import { selectAllProducts } from "../selectors/product.selector";
import { IProduct } from "src/app/IProduct";

@Injectable()
export class ProductEffect {
  constructor(
    private actions$: Actions,
    private productService: ProductService,
    private store: Store<AppState>
  ) {}

  loadProducts$ = createEffect(() =>{
    return  this.actions$.pipe(
    ofType(loadProducts),
    switchMap(() =>
      from(this.productService.getAllProducts()).pipe(
        map((products) => loadProductsSuccess({ products: products })),
        catchError((error) => of(loadProductsFailure({ error })))
      )
    )
  )}
   
  );

  addProduct$ = createEffect(() => this.actions$.pipe(
    ofType(addProduct),
    switchMap((action) => this.productService.addProduct(action.product)
        .pipe(
            map((product: IProduct) => addProductSuccess({ product })),
            catchError((error: string) => of(addProductFailure({ error })))
        )
    ),
),
);
  getProductById$ = createEffect(() => this.actions$.pipe(
    ofType(getProductById),
    concatMap((action) => this.productService.getProductById(action.id.toString())
    .pipe(map((product: IProduct) => getProductByIdSuccess({product})),
          catchError((error: string) => of(getProductByIdFailure({error})))))
  ))

  deleteProduct$ = createEffect(() => this.actions$.pipe(
    ofType(deleteProduct),
    switchMap((action) => this.productService.deleteProductById(action.id.toString())
    .pipe(map((product: IProduct) => deleteProductSuccess({product}))))
  ))

  updateProduct$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(updateProduct),
        switchMap((action) => from(this.productService.editProduct(action.product, action.id)
          .pipe(map(() => action.product),
            map((product: IProduct) => updateProductSuccess({product})),
            catchError((error) => of(updateProductFailure({error})))
          )))
      )
  );
}