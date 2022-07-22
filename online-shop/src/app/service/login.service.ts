import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable,tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from 'src/user';

@Injectable({
    providedIn: 'root'
})

export class LoginService {


    redirectUrl: string | null = null;
    user: User | null = null;

    constructor( private httpService: HttpClient){
    }

    login(username: string, password: string):Observable<User>{
      
        return this.httpService.post<User>(environment.loginUrl, {username,password}).pipe(tap((user) => (this.user = user)));
    }

    checkRole(role: string): boolean {
       
         return this.user?.roles.includes(role) == true;
         
      }

 }