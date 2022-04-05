import { Injectable } from '@angular/core';
import { LearningResource } from 'src/app/types/learning-resource.types';
import { LearningResourcesApi } from './learning-resources.api';

@Injectable({providedIn: 'root'})
export class LearningResourcesStore {
  loadingLearningResources = false;
  learningResourceList: LearningResource[] = [];

	constructor(private api: LearningResourcesApi) {
    this.getAllLearningResources();
  }

  getAllLearningResources() {
    // this.loadingLearningResources = true;
    // this.api.getAllLearningResources().subscribe((resources: LearningResource[]) => {
    //   this.learningResourceList = resources;
    //   this.loadingLearningResources = false;
    // });
  }

};
