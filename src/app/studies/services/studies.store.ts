import { Injectable } from '@angular/core';
import { SurveyStub, Survey, SurveyResponse } from '../../types/survey.types';
import { StudiesApi } from './studies.api';
import { parse as JSONToCSV} from 'json2csv';

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
    if(window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveBlob(blob, filename);
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
    csvHeaders.push('title');

    const opts = {
      fields: csvHeaders,
      flatten: true,
      flattenSeparator: ','
    };

    const csv = JSONToCSV(responses, opts);

    await this.saveCsv(`survey-results-${responses[0].title}.csv`, csv);
    console.log('completed file download');
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
