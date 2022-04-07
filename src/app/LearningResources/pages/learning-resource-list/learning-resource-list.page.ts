import {Component} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LearningResource } from 'src/app/types/learning-resource.types';
import { LearningResourcesStore } from '../../services/learning-resources.store';

@Component({
  selector: 'app-learning-resource-list',
  templateUrl: './learning-resource-list.page.html',
  styleUrls: ['./learning-resource-list.page.scss']
})
export class  LearningResourceListPage {
  isModalOpen = false;
  currentResource: LearningResource = null;
  isCreateMode = true;

  form: FormGroup = new FormGroup({});


  constructor( public store: LearningResourcesStore, private fb: FormBuilder) {}

  initForm() {
    this.form = this.fb.group({
      title: [this.currentResource.title || '', Validators.required],
      description: [this.currentResource.description || '', Validators.required],
      resourceLink: [this.currentResource.resourceLink || '', Validators.required],
    });
  }

  createResource() {
    this.isCreateMode = true;
    this.currentResource = {
      title: '',
      description: '',
      resourceLink: '',
    };
    this.openModal();
  }

  editResource(resource) {
    this.isCreateMode = false;
    this.currentResource = resource;
    this.openModal();
  }

  onCancel() {
    this.closeModal();
  }

  onSubmit() {
    if (this.form.valid) {
      if (this.isCreateMode) {
        this.store.createResource(this.form.value);
      } else {
        // this.store.editResource(this.form.value);
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
    this.currentResource = null;
  }

}
