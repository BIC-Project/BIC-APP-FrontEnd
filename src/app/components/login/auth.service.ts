import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';
import { BehaviorSubject, throwError } from 'rxjs';
import { User } from './user.model';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

interface AuthResponseData {
  status: string;
  message: string;
  userName: string;
  roles: string;
  expTime: number;
  authToken: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private url: string;
  private tokenExpirationTimer: any;
  user = new BehaviorSubject<User>(null);

  constructor(private http: HttpClient,
    private router: Router) {
    this.url = environment.baseURL + 'login';
    this.tokenExpirationTimer = null;
  }

  login(userName: string, password: string) {
    return this.http
      .post<AuthResponseData>(this.url, {
        userName: userName,
        password: password,
      })
      .pipe(
        catchError(this.handleResponseError),
        tap(respData => {
          this.handleAuthentication(
            respData.userName,
            respData.authToken,
            respData.expTime,
            respData.roles
          );
        })
      );
  }


  autoLogin() {
    const userData: {
      userName: string,
      _authToken: string,
      _authTokenExpDate: string,
      roles: string
    } = JSON.parse(localStorage.getItem('userData'));
    if (!userData || !userData._authToken || !userData.userName || !userData._authTokenExpDate) {
      return;
    }
    const loadedUser = new User(userData.userName, userData._authToken, new Date(userData._authTokenExpDate), userData.roles);

    //load user which is already present
    if (loadedUser.authTokenExpDate && loadedUser.authToken) {
      const expTime = new Date(userData._authTokenExpDate).getTime() - new Date().getTime();

      //check if expToken will expire in 2 day. Allow autologin only if exp is in 2 day
      const expThreshold: number = 48 * 60 * 60 * 1000; //in millisec
      if (expTime >= expThreshold) {
        this.user.next(loadedUser);
        this.autologout(expTime);
      }
      // if expiry in 2 day. Dont allow autologin
      else
        return;
    }
  }

  logout() {
    this.user.next(null);
    this.router.navigate(['/login']);
    localStorage.removeItem('userData');
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  notifyBeforeAutoLogout() {

  }

  autologout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
      alert("Session has expired! Please login again.")
    }, expirationDuration);
  }

  private handleAuthentication(userName: string, authToken: string, expTime: number, roles: string) {
    const authTokenExpDate = new Date(new Date().getTime() + expTime);
    const user = new User(userName, authToken, authTokenExpDate, roles);
    this.user.next(user);
    // check if token has expired
    this.autologout(expTime);
    localStorage.setItem('userData', JSON.stringify(user));
  }

  private handleResponseError(errorRes: HttpErrorResponse) {
    let errorMessage = 'Unknow error occured. Please contact admin.';
    if (
      !errorRes ||
      !errorRes.error ||
      !errorRes.error.message ||
      !errorRes.error.status
    ) {
      return throwError(errorMessage);
    } else if (
      errorRes.error.message == 'Unauthorized' &&
      errorRes.error.status == 401
    ) {
      errorMessage = 'Invalid username/password! Please try again.';
    }
    return throwError(errorMessage);
  }
}
