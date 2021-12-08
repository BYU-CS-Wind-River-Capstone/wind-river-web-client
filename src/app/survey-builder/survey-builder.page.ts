import { Component, OnInit } from '@angular/core';

import { SurveyBuilderApi } from './survey-builder.api';

@Component({
  selector: 'app-survey-builder',
  templateUrl: './survey-builder.page.html',
  styleUrls: ['./survey-builder.page.scss'],
})
export class SurveyBuilderPage {
  survey = {
    title: 'testTitle',
    description: 'test description',
    dueDate: 'tomorrow',
    questions: [],
  };
  constructor(private api: SurveyBuilderApi) { }

  toggleEdit(question) {
    question.isEditing = !question.isEditing;
  }

  addQuestion() {
    this.survey.questions.push(
        {
          textHtml: '',
          type: '',
          isEditing: false
        }
      );
  }

  removeQuestion(question) {
    const index = this.survey.questions.indexOf(question.index);
    if (index > -1) {
      this.survey.questions.splice(index, 1);
    } else {
      this.survey.questions.pop();
    }
  }

  saveResponse(question) {
    this.toggleEdit(question);
  }

  onTypeChange(value, question) {
    switch(value) {
      case 'BOOLEAN':
        break;
      case 'CHECK':
        question.options = [{label: '', value: ''}, {label: '', value: ''}, {label: '', value: ''}, {label: '', value: ''}];
        break;
      case 'SLIDER':
        question.startLabel = 'START';
        question.endLabel = 'END';
        question.min = 1;
        question.max = 6;
        question.step = 1;
        break;
      case 'RADIO':
        question.options = [{label: '', value: ''}, {label: '', value: ''}, {label: '', value: ''}, {label: '', value: ''}];
        break;
      default:
        break;
    }
  }

  saveSurvey() {
    // TODO: format questions to remove excess fields
    console.log('Saving survey');
    this.api.createSurvey(this.survey).subscribe();
  }
}
