import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-survey-builder',
  templateUrl: './survey-builder.page.html',
  styleUrls: ['./survey-builder.page.scss'],
})
export class SurveyBuilderPage {

  questions = new Array();
  numQuestions = 0;
  questionType;
  titleValue = 'Question Title';
  inputValue = 'Question Value';
  answerValue = 'Answer Value';
  place;
  constructor() { }

  toggleEdit(question) {
    question.isEditing = !question.isEditing;
  }

  addQuestion() {
    this.questions.push(
        {
          index: this.numQuestions,
          isEditing: false
        }
      );
  }

  removeQuestion(question) {
    const index = this.questions.indexOf(question.index);
    if (index > -1) {
      this.questions.splice(index, 1);
    } else {
      this.questions.pop();
    }
  }

  saveResponse(question) {
    this.toggleEdit(question);
  }

  public questionOptions(): void {
    console.log(this.place);
    const item = this.place;
    this.questionType = item.value;
    console.log(this.questionType);
  }
}
