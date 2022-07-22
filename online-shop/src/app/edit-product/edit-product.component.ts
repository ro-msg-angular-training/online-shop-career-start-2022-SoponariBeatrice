import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { IProduct } from '../IProduct';
import { ProductService } from '../service/product.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  myForm: FormGroup;
  id: string ;
  product : IProduct;
  productSubscription : Subscription;
  constructor(private fb: FormBuilder, private productService: ProductService,private route: ActivatedRoute) { }

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

  editProduct(){
    this.id = this.route.snapshot.paramMap.get("id") ?? "";
    this.product ={name : this.myForm?.value.name,
                   id: Number(this.id), 
                  category: this.myForm?.value.category,
                  price: this.myForm.value.price  } 
    this.product.category = this.category?.getRawValue();
    this.productSubscription = this.productService.editProduct(this.product,parseInt(this.id)).subscribe(() => alert("Changes saved"));
    
  }
  cancel(){
     this.myForm.reset() 
  }

  ngOnDestroy(){
    if(this.productSubscription !== undefined)
       this.productSubscription.unsubscribe();
  }
}
