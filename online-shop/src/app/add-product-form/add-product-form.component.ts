import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { random } from 'lodash';
import { Observable, Subscription } from 'rxjs';
import { IProduct } from '../IProduct';
import { ProductService } from '../service/product.service';
import { addProduct } from '../store/actions/product.action';
import { AppState } from '../store/state/app.state';

@Component({
  selector: 'app-add-product-form',
  templateUrl: './add-product-form.component.html',
  styleUrls: ['./add-product-form.component.css']
})
export class AddProductFormComponent implements OnInit {

  myForm: FormGroup;
  product : IProduct;
  productSubscription : Subscription;
  

  constructor(private fb: FormBuilder, private productService: ProductService, private store: Store<AppState> ) { }

  ngOnInit(): void {

    this.myForm = this.fb.group({
      name: ['',{validators: [
                 Validators.required
      ]}],
      price: ['',{validators: [
                  Validators.required,
                  Validators.pattern('[0-9]*')]}],
      category:  ['',{validators: [
        Validators.required,
        Validators.pattern('[a-zA-Z]*')]}]
    })
  }

  get name(){
    return this.myForm.get('name');
  }

  get price(){
    return this.myForm.get('price');
  }

  get category(){
    return this.myForm.get('category');
  }
  
  addProduct(){
    this.product = {name: this.myForm.value.name,
                    category: this.myForm.value.category,
                    price: this.myForm.value.price,
                    id : random()};
    //this.productSubscription = this.productService.addProduct(this.product).subscribe(() => alert("Product added succesfully"));
    this.store.dispatch(addProduct({product : this.product}));
    this.product = {name: '',
      category: '',
      price: -1,
      id : -1};
  }

  ngOnDestroy(){
    if(this.productSubscription !== undefined)
      this.productSubscription.unsubscribe();
  }

}
