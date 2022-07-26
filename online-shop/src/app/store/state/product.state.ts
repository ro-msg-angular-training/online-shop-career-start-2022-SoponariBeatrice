import { IProduct } from "../../IProduct";

export interface ProductState {
    products: IProduct[];
    selectedProduct: IProduct | undefined;
    error: string;
    status: 'pending' | 'loading' | 'error' | 'success';
  }
  
  export const initialProductState: ProductState = {
    products: [],
    selectedProduct: undefined,
    error: "",
    status: 'pending',
  };