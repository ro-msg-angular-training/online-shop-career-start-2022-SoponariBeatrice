import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  posts: any;
  constructor(private http: HttpClient){}

  getPosts(){
    this.posts = this.http.get(environment.productsUrl)
  }
}
