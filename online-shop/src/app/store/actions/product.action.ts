import { createAction, props } from '@ngrx/store';
import { IProduct } from 'src/app/IProduct';

  export const loadProducts = createAction('[Product] Load Products');
 
  export const addProduct = createAction(
    '[Product] Add Product',
    props<{ product: IProduct }>()
  )
  export const addProductSuccess = createAction(
    '[API] Add Product Success',
    props<{ product: IProduct }>()
  )

  export const addProductFailure = createAction(
    '[API] ADD Product Failure',
    props<{ error: string }>()
  );
  export const loadProductsSuccess = createAction(
    '[API] Load Products Success',
    props<{ products: IProduct[] }>()
  );
  
  export const loadProductsFailure = createAction(
    '[API] Load Products Failure',
    props<{ error: string }>()
  );

  export const getProductById = createAction(
    '[API] Get Product',
    props<{id: number}>()
  )

  export const getProductByIdSuccess = createAction(
    '[API] Get Product Success',
    props<{product: IProduct}>()
  )
  export const getProductByIdFailure = createAction(
    '[API] Get Product Failure',
    props<{error: string}>()
  )

  export const deleteProduct = createAction(
    '[API] Delete Product',
    props<{id: number}>()
  )

  export const deleteProductSuccess = createAction(
    '[API] Delete Product Success',
    props<{product: IProduct}>()
  )
  export const updateProduct = createAction(
    '[API] Update Product',
    props<{ product: IProduct, id: number}>()
  );
  
  export const updateProductSuccess = createAction(
    '[IProduct] Update Product Success',
    props<{ product: IProduct }>()
  );
  
  export const updateProductFailure = createAction(
    '[IProduct] Update Product Failure',
    props<{ error : string }>()
  );