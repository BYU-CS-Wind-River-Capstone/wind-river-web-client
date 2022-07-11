import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { LoginStore } from '../../services/login.store';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  form = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

    constructor(private route: Router, private store: LoginStore, private toastController: ToastController) {}
    ngOnInit(): void {
      this.logout();
    }

    logout() {
      this.store.logout();
    }

    login() {
      this.store.login({name: this.form.value.username, password: this.form.value.password})
      .subscribe(
        (tokens) => {
          this.store.saveUser(tokens);
          this.presentToast('Welcome!', 2000, 'primary');
          this.navigatePage('/studies/surveys');
        },
        (err) => {
          this.presentToast(err.error.message, 10000, 'danger');
        }
      );
    }

    resetPassword() {
      this.navigatePage('/login/password');
    }

    navigatePage(page: string) {
        this.route.navigateByUrl(page);
    }

    async presentToast(message, duration, color = 'primary') {
      const toast = await this.toastController.create({
        message,
        duration,
        color,
        mode: 'md'
      });
      toast.present();
    }

}
