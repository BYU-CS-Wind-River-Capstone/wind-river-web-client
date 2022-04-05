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
    this.loadingLearningResources = true;
    this.api.getAllLearningResources().subscribe((resources: LearningResource[]) => {
      this.learningResourceList = resources;
      this.loadingLearningResources = false;
    });
  }

  createResource(resource: LearningResource) {
    this.api.createLearningResource(resource).subscribe((newResource) => {
      this.learningResourceList.unshift(newResource);
    });
  }

  editResource(resource: LearningResource) {
    this.api.editLearningResource(resource).subscribe((editedResource) => {
      this.learningResourceList.splice(this.learningResourceList.findIndex(res => res.id === editedResource.id),1,editedResource);
    });
  }

  deleteResource(resource: LearningResource) {
    // TODO figure out why this deletes from the db but throws an error in the client.
    this.api.deleteLearningResource(resource).subscribe((deletedId: string) => {
      this.learningResourceList = this.learningResourceList.filter(currResource => currResource.id !== deletedId);
    });
  }

};
