import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { elementAt, Observable } from 'rxjs';
import { IProduct } from '../IProduct';
@Injectable({
    providedIn: 'root'
})
export class ProductService{

    readonly ROOT_URL = "http://localhost:3000/products";
    constructor(private http:HttpClient){}
    
    getAllProducts(): Observable<IProduct[]>{
       return this.http.get<IProduct[]>(this.ROOT_URL);
    }

    getProductById(id:string | null) : Observable<IProduct>{
        return this.http.get<IProduct>(this.ROOT_URL + "/" + id);
    }

    deleteProductById(id: string | null) {
       return this.http.delete<IProduct>(this.ROOT_URL + "/" + id);
    } 

    editProduct(product: IProduct, id: number) {
        return this.http.put(this.ROOT_URL + "/" + id, product);
    }

    addProduct(product: IProduct){
        return this.http.post(this.ROOT_URL, product);
    }
}