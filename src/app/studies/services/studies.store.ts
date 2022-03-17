import { Injectable } from '@angular/core';
import { SurveyStub, Survey, SurveyResponse } from '../../types/survey.types';
import { StudiesApi } from './studies.api';
import { parse as JSONToCSV } from 'json2csv';

@Injectable({providedIn: 'root'})
export class StudiesStore {
  loadingSurveyList = false;
  surveyList: SurveyStub[] = [];

  activeSurvey: Survey = null;
  loadingSurvey = false;

  //EXAMPLE SURVEY RESPONSE (FORMAT NOT FINAL)
  exampleSurveyResponse = {
    surveyId: '1',
    surveyTitle: 'the cheese survey',
    userId: '1234',
    userFullname: 'Bradley Uppercrust III',
    submissionDate: 'Wed Mar 16 2022 22:32:19 GMT-0600',
    answers: [
      {
        questionId: '0',
        questionText: 'Do you like cheese?',
        answer: 'Yes',
      },
      {
        questionId: '1',
        questionText: 'What is your favorite cheese?',
        answer: 'My favorite is gouda.',
      },
      {
        questionId: '2',
        questionText: 'On a scale from 1 to 10, how do you rate cheese?',
        answer: '9',
      },
      {
        questionId: '3',
        questionText: 'Do you use cheese recreationally or for medical purposes?',
        answer: 'c',
      },
    ]
  }

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

  async downloadCsv(source: Array<any>) {
    const csv = JSONToCSV(source, {fields: ["surveyId", "surveyTitle", "userId", "userFullname", "submissionDate",
      "answers.0.questionId", "answers.0.questionText", "answers.0.answer",
      "answers.1.questionId", "answers.1.questionText", "answers.1.answer",
      "answers.2.questionId", "answers.2.questionText", "answers.2.answer",
      "answers.3.questionId", "answers.3.questionText", "answers.3.answer",],
      flatten: true, flattenSeparator: ','});
    
    // TODO add survey id to downloaded file name when a type is set up for survey responses
    await this.saveCsv(`survey-results.csv`, csv);
    //await FileSystem.writeFile("./async.csv", csv);
    console.log("completed file download");
    //console.log(csv)
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
      // EXAMPLE CSV Download to use until we know survey response format and can retrieve from DynamoDB
      var source = []
      source.push(this.exampleSurveyResponse);
      source.push(this.exampleSurveyResponse);
      source.push(this.exampleSurveyResponse);
      source.push(this.exampleSurveyResponse);

      this.downloadCsv(source);
    });
  }

};
