import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { apiURL } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { LoginCredentials } from 'src/app/types/auth.types';

@Injectable()
export class LoginApi {

  // TODO the api should check if we are on network or not and fetch from the appropriate location.
	constructor(private http: HttpClient) {}

  login(credentials: LoginCredentials): Observable<any> {
    return this.http.post<any>(`${apiURL}/auth/login`, credentials);
  }

  // TODO add forgot password (after making it in the server)

}
