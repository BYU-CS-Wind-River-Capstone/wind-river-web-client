import { Component, OnInit } from '@angular/core';

import { SurveyBuilderApi } from './survey-builder.api';
import { add } from 'date-fns';

@Component({
  selector: 'app-survey-builder',
  templateUrl: './survey-builder.page.html',
  styleUrls: ['./survey-builder.page.scss'],
})
export class SurveyBuilderPage {
  survey = {
    id: new Date().toString(),
    adminId: '12345',
    title: 'Survey Title',
    description: 'Survey description',
    dueDate: add(new Date(), { days: 1}),
    questions: [],
    cumulative: false
  };

  constructor(private api: SurveyBuilderApi) {  }

  toggleEdit(question) {
    question.isEditing = !question.isEditing;
  }

  addQuestion() {
    this.survey.questions.push(
        {
          textHtml: '',
          type: '',
          isEditing: true,
          options: []
        }
      );
  }

  removeQuestion(question) {
    const index = this.survey.questions.indexOf(question);
    if (index > -1) {
      this.survey.questions.splice(index, 1);
    } else {
      this.survey.questions.pop();
    }
  }

  addOption(question) {
    question.options.push({
      label: '',
      value: ''
    });
  }

  removeOption(question, option) {
    const index = question.options.indexOf(option);
    if (index > -1) {
      question.options.splice(index, 1);
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
        question.options = [{label: '', value: ''}];
        break;
      case 'SLIDER':
        question.startLabel = 'START';
        question.endLabel = 'END';
        question.min = 1;
        question.max = 6;
        question.step = 1;

        //If we want to make min/max number options dynamic
        //question.minNumbers = Array(question.max - question.min).fill(null).map((x,i)=>i + 1);
        //question.maxNumbers = Array(11 - question.min).fill(null).map((x,i)=>i + 1 + question.min);
        break;
      case 'RADIO':
        question.options = [{label: '', value: ''}];
        break;
      default:
        break;
    }
  }

  saveSurvey() {
    const formattedSurvey = {...this.survey};
    formattedSurvey.questions.forEach(question => {
      delete question.isEditing;
      switch(question.type) {
        case 'SLIDER':
          delete question.options;
        break;
        case 'BOOLEAN':
          delete question.options;
        // eslint-disable-next-line no-fallthrough
        case 'CHECK':
        case 'RADIO':
          delete question.startLabel;
          delete question.endLabel;
          delete question.min;
          delete question.max;
          delete question.step;
          break;
      }
    });
    this.api.createSurvey(this.survey).subscribe();
  }
}
