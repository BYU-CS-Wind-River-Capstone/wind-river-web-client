import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LearningResource } from 'src/app/types/learning-resource.types';
import { apiURL } from 'src/environments/environment';

@Injectable()
export class LearningResourcesApi {
    constructor(private http: HttpClient) {}

    createLearningResource(resource: LearningResource): Observable<LearningResource> {
      return null;
      // return this.http.post<Survey>(`${apiURL}/survey/create`, survey);
    }

    getAllLearningResources(): Observable<LearningResource[]> {
      return null;
      // return this.http.get<SurveyStub[]>(`${apiURL}/survey`);
    }

    editLearningResource(resource: LearningResource): Observable<LearningResource> {
      return null;
    }

    deleteLearningResource(resourceId: string): Observable<LearningResource> {
      return null;
    }
}
