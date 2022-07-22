import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { __values } from 'tslib';
import * as _ from 'lodash';
import { IProduct } from '../IProduct';
import { ProductService } from '../service/product.service';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})

export class ProductListComponent implements OnInit {
  products$: Observable<IProduct[]>;

  constructor(private service: ProductService){}
  ngOnInit() {
    this.products$ = this.service.getAllProducts()
  }
 

}
