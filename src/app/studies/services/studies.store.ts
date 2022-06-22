import { Injectable } from '@angular/core';
import { SurveyStub, Survey, SurveyResponse } from '../../types/survey.types';
import { StudiesApi } from './studies.api';
import { parse as JSONToCSV} from 'json2csv';
import { Router } from '@angular/router';

@Injectable({providedIn: 'root'})
export class StudiesStore {
  loadingSurveyList = false;
  surveyList: SurveyStub[] = [];

  activeSurvey: Survey = null;
  loadingSurvey = false;

	constructor(private api: StudiesApi) {
    this.getAllSurveys();
  }

  async saveCsv(filename: string, data: any) {
    const blob = new Blob([data], {type: 'text/csv'});
    if((window.navigator as any).msSaveOrOpenBlob) {
      (window.navigator as any).msSaveBlob(blob, filename);
    }
    else{
        const elem = window.document.createElement('a');
        elem.href = window.URL.createObjectURL(blob);
        elem.download = filename;
        document.body.appendChild(elem);
        elem.click();
        document.body.removeChild(elem);
    }
  }

  async downloadCsv(responses: Array<any>, numQuestions: number) {
    const csvHeaders = ['createdDate', 'userId', 'surveyId'];
    for (let i = 1; i <= numQuestions; ++i) {
        csvHeaders.push('questionMap.' + i);
    }

    const opts = {
      fields: csvHeaders,
      flatten: true,
      flattenSeparator: ','
    };

    const csv = JSONToCSV(responses, opts);

    await this.saveCsv(`survey-results-${responses[0].surveyId}.csv`, csv);
    console.log('completed file download');
  }

  getAllSurveys() {
    this.loadingSurveyList = true;
    this.api.getAvailableSurveys().subscribe((surveys: SurveyStub[]) => {
      this.surveyList = surveys;
      this.loadingSurveyList = false;
    });
  }

  openSurveyInEditMode(surveyId: string, router: Router) {
    this.loadingSurvey = true;
    this.api.getSurveyById(surveyId).subscribe((survey: Survey) => {
      this.activeSurvey = survey;
      this.activeSurvey.isEditing = true;
      this.loadingSurvey = false;
      if (survey) {
        router.navigateByUrl('/studies');
      }
    });
  }

  openSurveyInViewMode(surveyId: string, router: Router) {
    this.loadingSurvey = true;
    this.api.getSurveyById(surveyId).subscribe((survey: Survey) => {
      this.activeSurvey = survey;
      this.activeSurvey.isEditing = false;
      this.loadingSurvey = false;
      if (survey) {
        router.navigateByUrl('/studies');
      }
    });
  }

  downloadSurveyResponses(surveyId: string) {
    this.api.getSurveyResponsesById(surveyId).subscribe((responses: SurveyResponse[]) => {

      let numQuestions = 0;
      if (responses.length > 0) {
        const questions: any = responses[0].questionMap;

        for(const question in questions) {
          if(questions.hasOwnProperty(question)) {
              ++numQuestions;
          }
        }
        this.downloadCsv(responses, numQuestions);
      }
    });
  }

};
