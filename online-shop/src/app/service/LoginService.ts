import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Route } from '@angular/router';
import { Observable,tap } from 'rxjs';
import { User } from 'src/user';

@Injectable({
    providedIn: 'root'
})

export class LoginService {

    ROOT_URL = "http://localhost:3000/";
    redirectUrl: string | null = null;
    user: User | null = null;

    constructor( private httpService: HttpClient){
    }

    login(username: string, password: string):Observable<User>{
      
        return this.httpService.post<User>(this.ROOT_URL + 'login', {username,password}).pipe(tap((user) => (this.user = user)));
    }

    checkRole(role: string): boolean {
        // this.user?.roles.forEach(element => {
        //     if(element == role)
        //         return true;
        //     else
        //         return false;
        // });
        //     return false;
         return this.user?.roles.includes(role) == true
         
      }

 }