import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { __values } from 'tslib';
import * as _ from 'lodash';
import { IProduct } from '../IProduct';
import { ProductService } from '../service/product.service';
import { selectAllProducts } from '../store/selectors/product.selector';
import { AppState } from '../store/state/app.state';
import { loadProducts } from '../store/actions/product.action';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})

export class ProductListComponent implements OnInit {
  products: IProduct[]
  public allProducts$ = this.store.select(selectAllProducts);

  constructor(private service: ProductService, private store: Store<AppState> ){}
  ngOnInit() {

    this.store.dispatch(loadProducts());
    this.allProducts$.subscribe((data) => {this.products = data})

  }
 

}
