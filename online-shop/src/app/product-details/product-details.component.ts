import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { Subscription } from 'rxjs';
import { CartService } from '../service/cart.service';
import { IProduct } from '../IProduct';

import { IProductWrapper } from '../IProductWrapper';
import { ProductService } from '../service/product.service';

interface Product {
  id: number,
  name: string,
  category: string,
  price: number
}

export interface Prod{
  productId: number,
  quantity: number
}


@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})

export class ProductDetailsComponent implements OnInit {
  currentProduct: Prod = {productId : -1, quantity: -1};
  id: string | null;
  product: Product;
  prodW: IProductWrapper;
 currentProductInfo: IProductWrapper;
 productSubscriptions : Subscription[] = [];
 constructor(private route: ActivatedRoute, private  service: ProductService, private cartService : CartService){ }

  ngOnInit() {
      this.id = this.route.snapshot.paramMap.get("id");
      this.service.getProductById(this.id).subscribe((product)=> this.product=product)
  }
  deleteProduct(){
    this.id = this.route.snapshot.paramMap.get("id");
    this.productSubscriptions.push(this.service.deleteProductById(this.id).subscribe(() => alert("Product deleted succesfully!")));
  }
 
  addToCart(){
    this.id = this.route.snapshot.paramMap.get("id");
    this.productSubscriptions.push(this.service.getProductById(this.id).subscribe(data => this.product = data));
    this.fromProdToProdWrapper(this.product);
    this.cartService.addToCart(this.prodW);
  }

  fromProdToProdWrapper(prod : IProduct)
  { 
      this.prodW = {productId: prod.id, quantity: 1};
  }

  ngOnDestroy(){
    this.productSubscriptions.forEach(element => {
      if(element !== undefined)  
        element.unsubscribe();
    });
  }
  
}
