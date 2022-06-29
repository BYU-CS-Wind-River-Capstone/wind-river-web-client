import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
    selector: 'app-groups',
    templateUrl: './groups.page.html',
    styleUrls: ['./groups.page.scss'],
})
export class GroupsPage implements OnInit {
  form = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

    constructor(private route: Router, private toastController: ToastController) {}
    ngOnInit(): void {}

    login() {

    }

    navigatePage(page: string) {
        this.route.navigateByUrl(page);
    }

    async presentToast(message, duration, color = 'primary') {

    }

}
