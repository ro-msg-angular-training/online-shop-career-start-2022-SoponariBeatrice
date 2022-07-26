import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IProduct } from '../IProduct';
@Injectable({
    providedIn: 'root'
})
export class ProductService{

    constructor(private http:HttpClient){}
    
    getAllProducts(): Observable<IProduct[]>{
       return this.http.get<IProduct[]>(environment.productsUrl);
    }

    getProductById(id:string | null) : Observable<IProduct>{
        return this.http.get<IProduct>(environment.productsUrl + "/" + id);
    }

    deleteProductById(id: string | null) {
       return this.http.delete<IProduct>(environment.productsUrl + "/" + id);
    } 

    editProduct(product: IProduct, id: number) {
        return this.http.put(environment.productsUrl + "/" + id, product);
    }

    addProduct(product: any): Observable<any>{
        return this.http.post(environment.productsUrl, product);
    }
}