import {Actions, createEffect, ofType} from "@ngrx/effects";
import {Injectable} from "@angular/core";
import {loginUser, loginUserFailure, loginUserSuccess} from "../actions/login.action";
import {catchError, switchMap} from "rxjs/operators";
import {map, of, tap, mergeMap} from "rxjs";
import {Router} from "@angular/router";
import { LoginService } from "src/app/service/login.service";
import { ThisReceiver } from "@angular/compiler";

@Injectable()
export class AuthEffects {
  constructor(
    private loginService: LoginService,
    private actions$: Actions,
    private router: Router
  ) {}


  login$ = createEffect(() =>
    this.actions$.pipe(
        ofType(loginUser),
        mergeMap((data) => this.loginService.login(data.username, data.password).pipe(
            map((data) => loginUserSuccess({username: data.username, password: data.password}),
                catchError((error) => of(loginUserFailure({error: error}))))
        ))
    )
    
  );

  
}