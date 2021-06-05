import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { exhaustMap, take } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable()
export class AuthIntercepterService implements HttpInterceptor {

  constructor(private authService: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return this.authService.user.pipe(take(1), exhaustMap(user => {
      //check for specific URL's which donot need authorization
      if (!user) {
        return next.handle(req);
      }

      //adding authToken to all requests
      const authTokenValue: string = "Bearer " + user.authToken;
      const updatedReq = req.clone({ headers: new HttpHeaders({ 'Authorization': authTokenValue }) });
      return next.handle(updatedReq);
    }));
  }
}
