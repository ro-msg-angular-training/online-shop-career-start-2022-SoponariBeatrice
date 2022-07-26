import { Component, OnInit } from '@angular/core';
import { CartService } from '../service/cart.service';
import { IProduct } from '../IProduct';
import { IProductWrapper } from '../IProductWrapper';
import { ProductService } from '../service/product.service';
import { first, forkJoin, Observable, Subscription, take } from 'rxjs';
import { trigger } from '@angular/animations';
import { AppState } from '../store/state/app.state';
import { Store } from '@ngrx/store';
import { selectAllCart } from '../store/selectors/cart.selector';
import { getProductById } from '../store/actions/product.action';
import { selectOneProduct, selectProductByID } from '../store/selectors/product.selector';
import { checkout } from '../store/actions/cart.action';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor(private store: Store<AppState>, private storeProduct: Store<AppState>, private storeOrder: Store<AppState>) { }
  cart: IProductWrapper[] = [];
  products: IProduct[]  = [];
  observableProducts: Observable<IProduct>[] = [];
  productSubscription : Subscription;
  public product$ = this.store.select(selectOneProduct);
  addedProduct: IProduct | undefined;
  ngOnInit(): void {
      this.allProductsFromChart();
  }

  allProductsFromChart(){
    this.products = []
    this.store.select(selectAllCart).subscribe((response) => {
    this.cart = response;
    });

    this.cart.forEach(element => {
      this.storeProduct.select(selectProductByID(element.productId)).pipe(take(1)).subscribe((product) => {
        if(product !== undefined)  
           this.products.push(product);
    });
  }) 
}
  placeOrder(){
 
   this.storeOrder.dispatch(checkout())
    alert("Order created successfully!");
  }

  ngOnDestroy(){
    if(this.productSubscription !== undefined)
      this.productSubscription.unsubscribe();
  }

}
