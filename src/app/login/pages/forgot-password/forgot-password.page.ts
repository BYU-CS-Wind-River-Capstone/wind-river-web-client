import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { LoginStore } from '../../services/login.store';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
    selector: 'app-forgot-password',
    templateUrl: './forgot-password.page.html',
})
export class ForgotPasswordPage implements OnInit {
  form = new FormGroup({
    username: new FormControl(''),
  });

    constructor(private route: Router, private store: LoginStore, private toastController: ToastController) {}
    ngOnInit(): void {
      this.logout();
    }

    logout() {
      this.store.logout();
    }

    sendResetCode() {
        //TODO send reset code for real
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
