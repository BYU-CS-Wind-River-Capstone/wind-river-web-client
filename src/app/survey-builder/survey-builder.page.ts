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

  constructor(private api: SurveyBuilderApi) {  }

  toggleEdit(question) {
    question.isEditing = !question.isEditing;
  }

  addQuestion() {
    this.survey.questions.push(
        {
          textHtml: '',
          type: '',
          isEditing: false,
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
    })
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

  // onStepSelect() {
  //   var element = document.getElementById(id);
  //   console.log(id);
  //   question.min = 1;
  //   question.max = element;
  //   console.log(question.min);
  //   console.log(question.max);
  // }

  saveSurvey() {
    // TODO: format questions to remove excess fields
    console.log('Saving survey');
    this.api.createSurvey(this.survey).subscribe();
  }
}
