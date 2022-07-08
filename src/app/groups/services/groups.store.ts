import { Injectable } from '@angular/core';
import { Group } from 'src/app/types/group.types';
import { GroupsApi } from './groups.api';

@Injectable({providedIn: 'root'})
export class GroupsStore {
  loadingLearningResources = false;
  groupsList: Group[] = [];

	constructor(
    private api: GroupsApi
    ) {
    this.getAllGroups();
  }

  getAllGroups() {
    this.api.getAllGroups().subscribe(res => {
      this.groupsList = res;
    });
    // this.loadingLearningResources = true;
    // this.api.getAllLearningResources().subscribe((resources: Group[]) => {
    //   this.learningResourceList = resources;
    //   this.loadingLearningResources = false;
    // });
  }

  createGroup(resource: Group) {
    this.api.createGroup(resource).subscribe((newResource) => {
      this.groupsList.unshift(newResource);
    });
  }

  // editResource(resource: LearningResource) {
  //   this.api.editLearningResource(resource).subscribe((editedResource) => {
  //     this.learningResourceList.splice(this.learningResourceList.findIndex(res => res.id === editedResource.id),1,editedResource);
  //   });
  // }

  deleteGroup(group: Group) {
    this.api.deleteGroup(group).subscribe((deletedResource: Group) => {
      this.groupsList = this.groupsList.filter(currResource => currResource.code !== deletedResource.code);
    });
  }

};
