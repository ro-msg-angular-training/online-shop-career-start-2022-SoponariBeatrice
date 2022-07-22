import { Component, OnInit } from '@angular/core';
import { CartService } from '../service/cart.service';
import { IProduct } from '../IProduct';
import { IProductWrapper } from '../IProductWrapper';
import { ProductService } from '../service/product.service';
import { forkJoin, Observable, Subscription } from 'rxjs';
import { trigger } from '@angular/animations';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor(private cartService : CartService, private productService: ProductService) { }
  cart: IProductWrapper[];
  products: IProduct[] = [];
  observableProducts: Observable<IProduct>[] = [];
  productSubscription : Subscription;
  ngOnInit(): void {
      this.cart = this.cartService.getCart();
      this.allProductsFromChart();
  }

  allProductsFromChart(){
    this.cart.forEach(element => {
            this.observableProducts.push(this.productService.getProductById(element.productId.toString()));
          });
    forkJoin(this.observableProducts).subscribe(data => this.products = data);
}

  placeOrder(){
   this.productSubscription = this.cartService.checkout().subscribe(() => alert("Order created successfully!"));
  }

  ngOnDestroy(){
    if(this.productSubscription !== undefined)
      this.productSubscription.unsubscribe();
  }

}
