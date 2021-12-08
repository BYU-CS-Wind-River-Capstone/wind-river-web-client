import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiURL } from 'src/environments/environment';

@Injectable()
export class SurveyBuilderApi {

	constructor(private http: HttpClient) {}


  createSurvey(survey: any) {
    return this.http.post<any[]>(`${apiURL}/survey/create`, survey);

  }

}
