import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CompComponent } from './comp/comp.component';
import { ProductListComponent } from './product-list/product-list.component';
import { RouterModule, Routes } from '@angular/router'
import { ProductDetailsComponent } from './product-details/product-details.component';
import {HttpClientModule} from '@angular/common/http'
import { ProductService } from './service/productService';
import { ReactiveFormsModule } from '@angular/forms';
import { CartComponent } from './cart/cart.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button'
import { MatCheckboxModule } from '@angular/material/checkbox';
import {MatChipsModule} from '@angular/material/chips';
import { EditProductComponent } from './edit-product/edit-product.component';
import { AddProductFormComponent } from './add-product-form/add-product-form.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [{path: 'log-in', component: LoginComponent},
                        { path: 'product-list', component: ProductListComponent},
                        {path:'product-details', component:ProductDetailsComponent},
                        {path: 'cart', component: CartComponent},
                        {path: 'edit-product', component: EditProductComponent},
                        {path: 'add-product', component: AddProductFormComponent}]

@NgModule({
  declarations: [
    AppComponent,
    CompComponent,
    ProductListComponent,
    ProductDetailsComponent,
    CartComponent,
    EditProductComponent,
    AddProductFormComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule, 
    AppRoutingModule, 
    HttpClientModule, 
    BrowserAnimationsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCheckboxModule,
    MatChipsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
