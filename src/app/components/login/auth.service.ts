import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';
import { BehaviorSubject, throwError } from 'rxjs';
import { User } from './user.model';

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
  url: string;

  user = new BehaviorSubject<User>(null);

  constructor(private http: HttpClient) {
    this.url = 'http://localhost:8080/login';
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
            respData.expTime
          );
        })
      );
  }

  private handleAuthentication(userName: string, authToken: string, expTime: number) {
    const authTokenExpDate = new Date(new Date().getTime() + expTime);
    const user = new User(userName, authToken, authTokenExpDate);
    this.user.next(user);
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
