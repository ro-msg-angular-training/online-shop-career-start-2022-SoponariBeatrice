import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'online-shop';
  readonly ROOT_URL = 'http://localhost:3000/products';
  posts: any;
  constructor(private http: HttpClient){}

  getPosts2(){
    this.posts = this.http.get(this.ROOT_URL)
  }
}
