import { Observable, of } from "rxjs";
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { IProduct } from "../IProduct";
import { IProductWrapper } from "../IProductWrapper";
import { environment } from "src/environments/environment";
import { AppState } from "../store/state/app.state";
import { Store } from "@ngrx/store";
import { selectAllCart } from "../store/selectors/cart.selector";

@Injectable({
    providedIn: 'root'
})

export class CartService {
    cart : IProductWrapper[] = [];
    public cart$ = this.store.select(selectAllCart);
    constructor( private httpService: HttpClient, private store: Store<AppState>){
    }

    addToCart(product: IProductWrapper): string
    {
        let newProd = this.getProductFromCart(product.productId);
        if(newProd == undefined)
            this.cart.push(product);
        else
        {
            this.increaseQuantity(newProd.productId);
        }
        return "success"
    }

    getCart() : IProductWrapper[]{
    
         this.cart$.subscribe((data) => this.cart = data)
         return this.cart
    }

    checkout():Observable<String>{

        return this.httpService.post(environment.orderUrl, this.getCart(), { responseType: 'text' });
        
    }

    getProductFromCart(id: number){
        return this.cart.find(x => x.productId == id);
    }

    increaseQuantity(id: number)
    {
        let newProduct = this.cart.find( p => p.productId == id);
        if(newProduct !== undefined)
            newProduct.quantity++;
    }
    
}