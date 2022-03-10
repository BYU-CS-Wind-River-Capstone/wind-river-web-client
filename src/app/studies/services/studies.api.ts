import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiURL } from 'src/environments/environment';
import { Survey, SurveyResponse, SurveyStub } from '../../types/survey.types';

@Injectable()
export class StudiesApi {

	constructor(private http: HttpClient) {}

  createSurvey(survey: Survey): Observable<Survey> {
    return this.http.post<Survey>(`${apiURL}/survey/create`, survey);
  }

  getAvailableSurveys(): Observable<SurveyStub[]> {
    return this.http.get<SurveyStub[]>(`${apiURL}/survey`);
  }

  getSurveyById(surveyId: string): Observable<Survey> {
    return this.http.get<Survey>(`${apiURL}/survey/${surveyId}`);
  }

  getSurveyResponsesById(surveyId: string): Observable<SurveyResponse[]> {
    return this.http.get<SurveyResponse[]>(`${apiURL}/survey/response/survey/${surveyId}`);
  }

}
