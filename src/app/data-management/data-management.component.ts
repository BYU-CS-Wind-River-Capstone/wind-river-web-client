import {Component, OnInit} from '@angular/core';

import {DataManagementApi} from './data-management.api';

class SurveyInfo {
  title: string;
  active: boolean;
  description: string;
  responseCount: number;

  constructor(surveyName: string, description: string, active: boolean, responseCount: number) {
    this.title = surveyName;
    this.active = active;
    this.responseCount = responseCount;
  }
}

@Component({
  selector: 'app-data-management',
  templateUrl: './data-management.component.html',
  styleUrls: ['./data-management.component.scss']
})
export class  DataManagementComponent {

  surveyInfoList = [
    new SurveyInfo('Depression Survey', 'Survey for incidence of deppresion', true, 20),
    new SurveyInfo('Addiction Survey', 'Survey to measure rates of addiction', true, 15),
    new SurveyInfo('Trauma Survey', 'Survey to measure rates of truama', false, 25),
    new SurveyInfo('Alcoholism Survey', 'Survey to measure rates of alcoholism', false, 20)
  ];

  constructor(private api: DataManagementApi) {}
}
