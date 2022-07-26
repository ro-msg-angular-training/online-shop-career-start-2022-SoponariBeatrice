import { createReducer, on } from '@ngrx/store';
import { addProduct, addProductFailure, addProductSuccess, deleteProduct, deleteProductSuccess, getProductById, getProductByIdFailure, getProductByIdSuccess, loadProducts, loadProductsFailure, loadProductsSuccess, updateProduct, updateProductFailure, updateProductSuccess } from '../actions/product.action';
import { initialProductState } from '../state/product.state';
  
export const productReducer = createReducer(
    // Supply the initial state
    initialProductState,
    on(addProduct, (state, { product }) => ({
      ...state,
      products: [...state.products, product],
    })),
    on(addProductSuccess, (state, {product}) => ({
      ...state,
      product,
      error:"",
      status: 'success'
    })),
    on(addProductFailure, (state, {error}) => ({
      ...state,
      error: error,
      status: 'error'
    })),

    // Trigger loading the todosS
    on(loadProducts, (state) => ({ ...state, status: 'loading' })),
    
    // Handle successfully loaded todos
    on(loadProductsSuccess, (state, { products }) => ({
      ...state,
      products,
      error: "",
      status: 'success',
    })),

    // Handle todos load failure
    on(loadProductsFailure, (state, { error }) => ({
      ...state,
      error: error,
      status: 'error',
    })),

    on(getProductById, (state) => ({...state, status: 'loading'})
    ),
    on(getProductByIdSuccess,(state, {product}) => ({
      ...state,
      error:"",
      status: 'success',
      selectedProduct: product
    })),
    on(getProductByIdFailure, (state, {error}) => ({
      ...state,
      error: error,
      status: 'error'
    })),

    on(deleteProduct, (state) => ({...state, status: 'loading'})),

    on(deleteProductSuccess, (state, {product}) => ({
      ...state,
      error: "",
      status: 'success',
      selectedProduct: product
    })),
    on(updateProduct, (state) => ({
      ...state,
      status: 'loading'
    })),
    on(updateProductSuccess, (state) => ({
      ...state,
      status: 'success'
    })),
    on(updateProductFailure, (state, { error }) => ({
      ...state,
      error: error,
      status: 'error'
    }))
  );