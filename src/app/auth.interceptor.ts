import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // TODO figure out how to use the refreshToken to keep things going
    const accessToken = localStorage.getItem('LIFE_HEALING_TOKEN');
    if (accessToken) {
      const reqWithAuth = req.clone({
        setHeaders: {
          // eslint-disable-next-line @typescript-eslint/naming-convention
          Authorization: `Bearer ${accessToken}`,
        }
      });
      return next.handle(reqWithAuth);
    }
    return next.handle(req);
  }

}
