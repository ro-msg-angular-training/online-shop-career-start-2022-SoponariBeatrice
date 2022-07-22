import { Observable, of } from "rxjs";
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { IProduct } from "../IProduct";
import { IProductWrapper } from "../IProductWrapper";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})

export class CartService {
    cart : IProductWrapper[] = [];
    constructor( private httpService: HttpClient){
    }

    addToCart(product: IProductWrapper)
    {
        let newProd = this.getProductFromCart(product.productId);
        if(newProd == undefined)
            this.cart.push(product);
        else
        {
            this.increaseQuantity(newProd.productId);
        }
    }

    getCart() : IProductWrapper[]{
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