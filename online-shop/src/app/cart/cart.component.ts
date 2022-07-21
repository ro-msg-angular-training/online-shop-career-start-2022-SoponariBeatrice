import { Component, OnInit } from '@angular/core';
import { CartService } from '../CartService';
import { IProduct } from '../IProduct';
import { IProductWrapper } from '../IProductWrapper';
import { ProductService } from '../service/productService';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor(private cartService : CartService, private productService: ProductService) { }
  cart: IProductWrapper[];
  products: IProduct[] = [];
  ngOnInit(): void {
      this.cart = this.cartService.getCart();
      this.allProductsFromChart();
  }
  
  allProductsFromChart(){
      this.cart.forEach(element => {
        this.productService.getProductById(element.productId.toString()).subscribe(data => this.products.push(data))
      });
  }

  placeOrder(){
    this.cartService.checkout().subscribe(() => alert("Order created successfully!"));
  }

}
