import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Auth } from './auth.model';
import { throwError, BehaviorSubject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { User } from './user.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: "root"
})

export class AuthService {
  user = new BehaviorSubject<User>(null);
  tokenExpirationTimer: any;
  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  signup(email: string, password: string) {
    const credentials = {
      email: email,
      password: password,
      returnSecureToken: true
    }
    return this.http.post<Auth>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCwecswrRvuzAkDa7Gqy18XE-_Ak90fePw',
      credentials
    ).pipe(catchError(errorRes => this.onHandleError(errorRes)),
      tap(resData => this.onHandleAuthentication(
        resData.localId,
        resData.email,
        resData.idToken,
        +resData.expiresIn
      )));
  }

  login(email: string, password: string) {
    const credentials = {
      email: email,
      password: password,
      returnSecureToken: true
    }
    return this.http.post<Auth>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCwecswrRvuzAkDa7Gqy18XE-_Ak90fePw',
      credentials
    ).pipe(
      catchError(errorRes => this.onHandleError(errorRes)),
      tap(resData => this.onHandleAuthentication(
        resData.localId,
        resData.email,
        resData.idToken,
        +resData.expiresIn
      ))
    );
  }

  private onHandleAuthentication(localId: string, email: string, idToken: string, expiresIn: number) {
    const expiresDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(localId, email, idToken, expiresDate);
    console.log(user);
    this.user.next(user);
    this.autoLogout(expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(user));
  }

  autoLogin() {
    const userData: {
      id: string,
      email: string,
      _token: string,
      _tokenExpiration: string
    } = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      return;
    }
    const loadedUser = new User(userData.id, userData.email, userData._token, new Date(userData._tokenExpiration));
    if(loadedUser.token) {
      this.user.next(loadedUser);
      const expirationDuration = new Date(userData._tokenExpiration).getTime() - new Date().getTime();
      this.autoLogout(expirationDuration);
    }
  }

  logout() {
    this.user.next(null);
    this.router.navigateByUrl('/auth');
    localStorage.removeItem('userData');
    if(this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration)
  }

  private onHandleError(errorRes: HttpErrorResponse) {
    console.log(errorRes);
    let errorMessage: string = "An unknown error occured";

    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage);
    } else {
      switch (errorRes.error.error.message) {
        case 'EMAIL_EXISTS':
          errorMessage = "The email address is already in use by another account"
          break;
        case 'OPERATION_NOT_ALLOWED':
          errorMessage = "Password sign-in is disabled for this project"
          break
        case 'TOO_MANY_ATTEMPTS_TRY_LATER':
          errorMessage = "We have blocked all requests from this device due to unusual activity. Try again later."
          break
        case 'EMAIL_NOT_FOUND':
          errorMessage = "There is no user record corresponding to this identifier. The user may have been deleted."
          break
        case 'INVALID_PASSWORD':
          errorMessage = "The password is invalid or the user does not have a password"
          break
        case 'USER_DISABLED':
          errorMessage = "The user account has been disabled by an administrator."
          break
        default:
          errorMessage = errorMessage;
          break;
      }
    }
    return throwError(errorMessage)
  }
}
