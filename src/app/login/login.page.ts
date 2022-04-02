import { Component, OnInit } from '@angular/core'

import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router'
import { apiURL } from 'src/environments/environment'

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
    username: string
    password: string

    constructor(private route: Router, private http: HttpClient) {}
    ngOnInit(): void {}

    login() {
        this.http
            .post<any>(`${apiURL}/auth/login`, {
                name: this.username,
                password: this.password,
            })
            .subscribe(
                (tokens) => {
                    this.saveUser(tokens)
                    this.navigatePage('/studies')
                },
                (err) => {
                    console.log(err.error.message, 10000, 'danger')
                }
            )
    }

    navigatePage(page: string) {
        this.route.navigateByUrl(page)
    }

    saveUser(tokens) {
        // TODO figure out why only the idToken works to validate with the server, it feels like the access token should be doing that...
        localStorage.setItem('LIFE_HEALING_TOKEN', tokens.idToken.jwtToken)
        localStorage.setItem('LIFE_HEALING_USER_ID', tokens.idToken.payload.sub)
        // TODO save the other useful user information (username, etc) to access throughout the app
    }
}
