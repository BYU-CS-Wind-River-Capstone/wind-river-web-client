import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { apiURL } from 'src/environments/environment';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {
  // TODO if this ends up being expensive for Dr. Hart, we might just switch it to check for the existance of the token
  constructor( private router: Router, private http: HttpClient) {}

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) {
    return this.testToken();
  }

  async canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) {
    return this.testToken();
  }

  async testToken() {
    let tokenValid = false;
    try {
      const {authorized} = await this.checkToken().pipe(take(1)).toPromise();
      tokenValid = authorized;
    } catch (error) {
      return this.router.createUrlTree(['/']);
    }
    return tokenValid || this.router.createUrlTree(['/']);
  }

  checkToken(): Observable<any> {
    // TODO create an endpoint that verifies provider tokens
    return this.http.get<any>(`${apiURL}/auth/checkToken`);
  }
}
