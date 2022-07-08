import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Group } from 'src/app/types/group.types';
import { GroupsStore } from '../../services/groups.store';

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
  isModalOpen = false;
  currentGroup: any = null;
  isCreateMode = true;

    constructor(private route: Router, private toastController: ToastController, public store: GroupsStore, private fb: FormBuilder) {}
    ngOnInit(): void {}

    login() {

    }

    initForm() {
      this.form = this.fb.group({
        groupName: [this.currentGroup.name || '', Validators.required],
        description: [this.currentGroup.description || '', Validators.required],
      });
    }

    createGroup() {
      this.isCreateMode = true;
      this.currentGroup = {
        name: '',
      };
      this.openModal();
    }

    editGroup(group) {
      this.isCreateMode = false;
      this.currentGroup = group;
      this.openModal();
    }

    onCancel() {
      this.closeModal();
    }

    onSubmit() {
      if (this.form.valid) {
        if (this.isCreateMode) {
          this.store.createGroup(this.form.value);
        } else {
          // this.store.editGroup(this.form.value);
        }
        this.closeModal();
      }
    }

    openModal() {
      this.initForm();
      this.isModalOpen = true;
    }

    closeModal() {
      this.isModalOpen = false;
      this.currentGroup = null;
    }

    navigatePage(page: string) {
        this.route.navigateByUrl(page);
    }

    async presentToast(message, duration, color = 'primary') {

    }

}
