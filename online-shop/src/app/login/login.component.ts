import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { LoginService } from '../service/LoginService';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  myForm: FormGroup;
  
  constructor(private fb: FormBuilder, private loginService: LoginService, private router: Router) { }

  ngOnInit(): void {
    this.myForm = this.fb.group({
      username: ['', {validators: [
                 Validators.required
      ]}],
      password: ['',{validators: [
                  Validators.required
                  ]}]
    })

  }

  get username(){
    return this.myForm.get('username');
  }

  get password(){
    return this.myForm.get('password');
  }
  login(){
      const user = {
        username: this.myForm.value.username,
        password: this.myForm.value.password
      }
      console.log(user.username, user.password)
      this.loginService.login(user.username, user.password).subscribe(() =>  {const redirectUrl = this.loginService.redirectUrl;
        this.router.navigateByUrl("/list-of-products");
      });
      
  }
}
