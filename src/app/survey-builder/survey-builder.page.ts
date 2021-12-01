import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-survey-builder',
  templateUrl: './survey-builder.page.html',
  styleUrls: ['./survey-builder.page.scss'],
})
export class SurveyBuilderPage {

  questions = new Array();
  numQuestions = 0;
  constructor() { }

  toggleEdit(question) {
    // const index = this.questions.indexOf(question.index);
    // if (this.questions.length > 0) {
    //   this.questions[index].isEditing = !this.questions[index].isEditing;
    // }
    question.isEditing = !question.isEditing;
  }

  addQuestion() {
    this.questions.push(
        {
          index: this.numQuestions,
          isEditing: false
        }
      );
    ++this.numQuestions;
  }

  removeQuestion(question) {
    const index = this.questions.indexOf(question.index);
    if (index > -1) {
      this.questions.splice(index, 1);
    } else {
      this.questions.pop();
    }
  }

}
