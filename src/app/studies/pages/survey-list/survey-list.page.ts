import {Component} from '@angular/core';
import { Router } from '@angular/router';
import { StudiesStore } from '../../services/studies.store';

@Component({
  selector: 'app-survey-list',
  templateUrl: './survey-list.page.html',
  styleUrls: ['./survey-list.page.scss']
})
export class  SurveyListPage {

  constructor( public store: StudiesStore, private router: Router) {}

  createSurvey() {
    this.router.navigateByUrl('/studies');
  }

}
