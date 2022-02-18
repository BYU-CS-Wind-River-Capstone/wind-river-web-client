import {Component} from '@angular/core';
import { StudiesStore } from '../../services/studies.store';

@Component({
  selector: 'app-survey-list',
  templateUrl: './survey-list.page.html',
  styleUrls: ['./survey-list.page.scss']
})
export class  SurveyListPage {

  constructor( public store: StudiesStore) {}

}
