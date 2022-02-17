import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiURL } from 'src/environments/environment';

@Injectable()
export class StudiesApi {

	constructor(private http: HttpClient) {}

  createSurvey(survey: any) {
    return this.http.post<any[]>(`${apiURL}/survey/create`, survey);
  }

  getAvailableSurveys() {
    return this.http.get<any[]>(`${apiURL}/survey`);
  }

  getSurveyById(surveyId: string) {
    return this.http.get<any[]>(`${apiURL}/survey/${surveyId}`);
  }

  getSurveyResponsesById(surveyId: string) {
    return this.http.get<any[]>(`${apiURL}/survey/response/survey/${surveyId}`);
  }

}
