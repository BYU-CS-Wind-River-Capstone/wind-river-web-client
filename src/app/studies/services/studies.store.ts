import { Injectable } from '@angular/core';
import { StudiesApi } from './studies.api';

@Injectable({providedIn: 'root'})
export class StudiesStore {
  loadingSurveyList = false;
  surveyList = [];

  activeSurvey: any = null;
  loadingSurvey = false;

	constructor(private api: StudiesApi) {
    this.getAllSurveys();
  }

  getAllSurveys() {
    this.loadingSurveyList = true;
    this.api.getAvailableSurveys().subscribe(surveys => {
      this.surveyList = surveys;
      this.loadingSurveyList = false;
    });
  }

  openSurvey(surveyId: string, viewOnly: boolean) {
    this.loadingSurvey = true;
    this.api.getSurveyById(surveyId).subscribe((survey) => {
      this.activeSurvey = survey;
      // TODO route to the survey builder page
      this.loadingSurvey = false;
    });
  }

  downloadSurveyResponses(surveyId: string) {
    this.api.getSurveyResponsesById(surveyId).subscribe((responses) => {
      console.log({responses});
      // TODO actually download the results as a csv
    });
  }

};
