import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { LearningResource } from 'src/app/types/learning-resource.types';
import { apiURL } from 'src/environments/environment';

@Injectable()
export class LearningResourcesApi {
    constructor(private http: HttpClient) {}

    createLearningResource(resource: LearningResource): Observable<LearningResource> {
      return this.http.post<LearningResource>(`${apiURL}/learning-resource/create`, resource);
    }

    getAllLearningResources(): Observable<LearningResource[]> {
      return this.http.get<LearningResource[]>(`${apiURL}/learning-resource`);
    }

    // editLearningResource(resource: LearningResource): Observable<LearningResource> {
    //   return this.http.post<LearningResource>(`${apiURL}/learning-resource/edit`, resource);
    // }

    deleteLearningResource(resource: LearningResource): Observable<LearningResource> {
      return this.http.post<LearningResource>(`${apiURL}/learning-resource/delete`, resource);
    }
}
