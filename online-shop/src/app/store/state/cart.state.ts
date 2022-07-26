import { IProductWrapper } from "src/app/IProductWrapper";

export interface CartState {
    products: IProductWrapper[];
    error: string;
    status: 'pending' | 'loading' | 'error' | 'success';
  }
  
  export const initialCartState: CartState = {
    products: [],
    error: "",
    status: 'pending',
  };