import { state } from '@angular/animations';
import { createReducer, on } from '@ngrx/store';
import { addToCart, addToCartSuccess } from "../actions/cart.action";
import { addProductFailure } from '../actions/product.action';
import { initialCartState } from "../state/cart.state";
import { productReducer } from './product.reducer';

export const cartReducer = createReducer(
    initialCartState,
    on(addToCart, (state, { product }) => {
       const addedProduct = state.products.find(x => x.productId === product.productId);
       if(addedProduct === undefined)
       {
        return { ...state,
            products:[...state.products, {productId: product.productId, quantity: 1}],
            status: 'success',
            error: ""
            
        };
       }
       else{
        const newAddedProduct = {productId: product.productId, quantity: (addedProduct.quantity + 1)}
        return {
            ...state,
            products: state.products.map((item) => {return item.productId === product.productId ? newAddedProduct : item;}),
            status: 'success',
            error: ""
        };
        }
      })
)