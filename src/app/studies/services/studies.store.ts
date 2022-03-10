import { Injectable } from '@angular/core';
import { SurveyStub, Survey, SurveyResponse } from '../../types/survey.types';
import { StudiesApi } from './studies.api';

@Injectable({providedIn: 'root'})
export class StudiesStore {
  loadingSurveyList = false;
  surveyList: SurveyStub[] = [];

  activeSurvey: Survey = null;
  loadingSurvey = false;

	constructor(private api: StudiesApi) {
    this.getAllSurveys();
  }

  getAllSurveys() {
    this.loadingSurveyList = true;
    this.api.getAvailableSurveys().subscribe((surveys: SurveyStub[]) => {
      this.surveyList = surveys;
      this.loadingSurveyList = false;
    });
  }

  openSurvey(surveyId: string, viewOnly: boolean) {
    this.loadingSurvey = true;
    this.api.getSurveyById(surveyId).subscribe((survey: Survey) => {
      this.activeSurvey = survey;
      // TODO route to the survey builder page
      this.loadingSurvey = false;
    });
  }

  downloadSurveyResponses(surveyId: string) {
    this.api.getSurveyResponsesById(surveyId).subscribe((responses: SurveyResponse[]) => {
      console.log({responses});
      // TODO actually download the results as a csv
    });
  }

};
