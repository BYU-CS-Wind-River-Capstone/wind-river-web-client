import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginPageRoutingModule } from './login-routing.module';

import { LoginPage } from './pages/login/login.page';
import { LoginApi } from './services/login.api';
import { LoginStore } from './services/login.store';
import { ForgotPasswordPage } from './pages/forgot-password/forgot-password.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    LoginPageRoutingModule
  ],
  declarations: [LoginPage, ForgotPasswordPage],
  providers: [LoginApi, LoginStore]
})
export class LoginPageModule {}
