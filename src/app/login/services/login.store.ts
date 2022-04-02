import { Injectable } from '@angular/core';
import { LoginCredentials } from 'src/app/types/auth.types';
import { LoginApi } from './login.api';

@Injectable({providedIn: 'root'})
export class LoginStore {

	constructor(private api: LoginApi) {}

  login(credentials: LoginCredentials) {
    return this.api.login(credentials);
  }

  saveUser(tokens) {
    // TODO figure out why only the idToken works to validate with the server, it feels like the access token should be doing that...
    localStorage.setItem('LIFE_HEALING_TOKEN', tokens.idToken.jwtToken);
    localStorage.setItem('LIFE_HEALING_USER_ID', tokens.idToken.payload.sub);
    // TODO save the other useful user information (username, etc) to access throughout the app
  }

}
