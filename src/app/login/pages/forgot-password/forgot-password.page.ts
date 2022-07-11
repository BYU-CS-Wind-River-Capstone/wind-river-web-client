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
    verificationCode: new FormControl(''),
    newPassword: new FormControl(''),
  });
  isUsernameValid: boolean;
  storedUsername: string;

    constructor(private route: Router, private store: LoginStore, private toastController: ToastController) {}
    ngOnInit(): void {
      this.logout();
      this.isUsernameValid = false;
    }

    logout() {
      this.store.logout();
    }

    back() {
      this.navigatePage('/login');
    }

    sendResetCode() {
      const userName = (document.getElementById('usernameInput') as HTMLInputElement).value;
      this.store.resetPassword(userName).subscribe(
        res => {
          this.isUsernameValid = true;
          this.storedUsername = userName;
        },
        err => {
          console.log(err);
          this.isUsernameValid = false;
          this.presentToast(err.error.message, 4000, 'danger');
        }
      );
    }

    updatePassword() {
      this.store.updatePassword({username: this.storedUsername,
        verificationCode: this.form.value.verificationCode,
        newPassword: this.form.value.newPassword})
      .subscribe(
        (res) => {
          this.isUsernameValid = false;
          this.storedUsername = '';
          (document.getElementById('usernameInput') as HTMLInputElement).value = '';
          this.presentToast('Now you can login with your new password!', 2000, 'primary');
          this.route.navigateByUrl('/login');
        },
        (err) => {
          console.log(err.message);
          this.presentToast('Invalid verification code or password.', 10000, 'danger');
        }
      );
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
