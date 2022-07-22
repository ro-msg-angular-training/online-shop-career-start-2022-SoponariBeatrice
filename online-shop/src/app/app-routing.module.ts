import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { CartComponent } from './cart/cart.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { AddProductFormComponent } from './add-product-form/add-product-form.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  {path: '', canActivate: [AuthGuard], children:
    [
      { 
        path: 'list-of-products', 
        component: ProductListComponent
      },
      { path : 'product-details/:id', 
        component: ProductDetailsComponent 
      },
      {
        path: "cart", component: CartComponent
      },
      {
        path: "edit-product/:id", component: EditProductComponent
      },
      {
        path: "add-product", component: AddProductFormComponent
      },
     
    ]},
  {
    path: '',
    redirectTo: 'log-in', 
    pathMatch:'full'
  },
  {
    path: "log-in", component: LoginComponent
  }
   
  ];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
