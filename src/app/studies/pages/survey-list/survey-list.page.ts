import {Component} from '@angular/core';
import { Router } from '@angular/router';
import { SurveyStub } from 'src/app/types/survey.types';
import { StudiesStore } from '../../services/studies.store';

@Component({
  selector: 'app-survey-list',
  templateUrl: './survey-list.page.html',
  styleUrls: ['./survey-list.page.scss']
})
export class  SurveyListPage {

  constructor( public store: StudiesStore, private router: Router) {}

  createSurvey() {
    this.store.activeSurvey = null;
    this.router.navigateByUrl('/studies');
  }

  viewSurvey(survey: SurveyStub) {
    this.store.openSurveyInViewMode(survey.id, this.router);
  }

  editSurvey(survey: SurveyStub) {
    this.store.openSurveyInEditMode(survey.id, this.router);
  }

  downloadSurvey(survey: SurveyStub) {
    this.store.downloadSurveyResponses(survey.id);
  }

}
