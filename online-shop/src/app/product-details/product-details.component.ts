import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { Subscription } from 'rxjs';
import { CartService } from '../service/cart.service';
import { IProduct } from '../IProduct';

import { IProductWrapper } from '../IProductWrapper';
import { ProductService } from '../service/product.service';
import { AppModule } from '../app.module';
import { Store } from '@ngrx/store';
import { selectOneProduct } from '../store/selectors/product.selector';
import { AppState } from '../store/state/app.state';
import { deleteProduct, getProductById } from '../store/actions/product.action';
import { addToCart } from '../store/actions/cart.action';
import { selectAllCart } from '../store/selectors/cart.selector';

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
  id: number;
  product: IProduct;
  prodW: IProductWrapper;
  currentProductInfo: IProductWrapper;
  productSubscriptions : Subscription[] = [];
  public product$ = this.store.select(selectOneProduct);
  public cart$ = this.storeCart.select(selectAllCart);
  constructor(private route: ActivatedRoute, private store: Store<AppState>, private storeCart: Store<AppState>){ }

  ngOnInit() {
      this.id = this.route.snapshot.params['id'];
      this.store.dispatch(getProductById({id: this.id}));
      this.product$.subscribe((data) => {
        if(data != undefined)
        this.product = data
      })
  }
  deleteProduct(){
    this.store.dispatch(deleteProduct({id : this.id}))
  }
 
  addToCart(){
     
     this.fromProdToProdWrapper(this.product);
     this.storeCart.dispatch(addToCart({product : this.prodW}));
     alert("Added");
     
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
