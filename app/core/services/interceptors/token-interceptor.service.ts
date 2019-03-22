import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { AppSetting } from 'src/app/utils/app-setting';

import { of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { StorageService } from 'src/app/core/services/storage/storage.service';
import {Router} from '@angular/router';

import { LoginService } from 'src/app/core/services/login.service';

import { throwError } from 'rxjs';

@Injectable()
export class TokenInterceptorService implements HttpInterceptor {

  token: string;

  constructor(private storageSrv: StorageService, private router: Router, private loginService: LoginService) {
    this.token = storageSrv.get('token');
   }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (this.token) {
          request = request.clone({
            setHeaders: {
                Authorization: `Bearer ${this.token}`
           }
        });
    }

    return next.handle(request).pipe(
      tap(
        event => this.handleResponse(request, event),
        error => this.handleError(request, error)
      )
    );
  }

  handleResponse(req: HttpRequest<any>, event) {
    if (event instanceof HttpResponse) {
      console.log(
          ' Response Status ', event.status,
          ' With body ', event.body);
    }
  }

  handleError(req: HttpRequest<any>, event) {

    console.log(
      ' Response Status ', event.status,
      ' With error ', event.error);

    if (event.status === 401) {
      this.loginService.logout();
   // location.reload(true);
    }

    const error = event.error.message || event.statusText;
    return throwError(error);
  }

}
