import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { apiURL } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { LoginCredentials, SubmitUsernameRequest, UpdatePasswordRequest } from 'src/app/types/auth.types';

@Injectable()
export class LoginApi {

  // TODO the api should check if we are on network or not and fetch from the appropriate location.
	constructor(private http: HttpClient) {}

  login(credentials: LoginCredentials): Observable<any> {
    return this.http.post<any>(`${apiURL}/auth/login`, credentials);
  }

  resetPassword(userName: string) {
    const request: SubmitUsernameRequest  = {username: userName};
    return this.http.post<any>(`${apiURL}/auth/submit-username`, request);
  }

  updatePassword(updatePasswordRequest: UpdatePasswordRequest) {
    return this.http.post(`${apiURL}/auth/update-password`, updatePasswordRequest, {responseType: 'text'});
  }

  // TODO add forgot password (after making it in the server)

}
