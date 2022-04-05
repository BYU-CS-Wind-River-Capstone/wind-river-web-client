import {Component} from '@angular/core';
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

  constructor( public store: LearningResourcesStore) {}

  createResource() {
    this.currentResource = {
      title: '',
      description: '',
      url: '',
    };
    this.isModalOpen = true;
  }

}
