import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { RoutesEnum } from '../routes.enum';
import { LoginService } from '../service/login.service';
import { loginUser } from '../store/actions/login.action';
import { AppState } from '../store/state/app.state';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  myForm: FormGroup;
  loginSubscription : Subscription;
  enumForRoutes : RoutesEnum;
  constructor(private fb: FormBuilder, private loginService: LoginService, private router: Router,  private store: Store<AppState>) { }

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
      this.store.dispatch(loginUser({username: user.username, password: user.password}));
     this.loginSubscription = this.loginService.login(user.username, user.password).subscribe(() =>  {const redirectUrl = this.loginService.redirectUrl;
        this.router.navigateByUrl(RoutesEnum.ProductList);
      });
      
  }

  ngOnDestroy(){
    if(this.loginSubscription !== undefined)
        this.loginSubscription.unsubscribe();
  }
}
