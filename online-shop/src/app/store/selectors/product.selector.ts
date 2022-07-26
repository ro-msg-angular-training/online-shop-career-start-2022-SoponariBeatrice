import { AppState } from "../state/app.state";
import { ProductState } from "../state/product.state";
import {createFeatureSelector, createSelector} from "@ngrx/store"
import { IProduct } from "src/app/IProduct";
 
export const selectProducts = (state: AppState) => state.products;

export const selectAllProducts = createSelector(
    selectProducts,
    (state: ProductState) => state.products
);

export const productsSelector = createFeatureSelector<ProductState>('products');
export const selectOneProduct = createSelector(
    productsSelector,
    (state: ProductState) => state.selectedProduct
)
export const selectProductByID = (id : number) => createSelector(
    selectProducts,
    (state: ProductState) => state.products.find(prod => prod.id === id)
  );