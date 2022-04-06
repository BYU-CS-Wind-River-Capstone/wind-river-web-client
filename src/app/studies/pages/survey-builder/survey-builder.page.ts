import { Component, OnInit } from '@angular/core'
import { Question, QuestionTypes, Schedule, Survey } from '../../../types/survey.types'

import { StudiesApi } from '../../services/studies.api'
import { add } from 'date-fns'

@Component({
    selector: 'app-survey-builder',
    templateUrl: './survey-builder.page.html',
    styleUrls: ['./survey-builder.page.scss'],
})
export class SurveyBuilderPage {
    questionTypes = QuestionTypes
    schedule = Schedule
    minimumDate = new Date().toISOString()
    maximumDate = add(new Date(), { years: 2 }).toISOString()
    survey: Survey = {
        title: 'Survey Title',
        isEditing: false,
        repeatingSchedule: this.schedule.none,
        description: 'Survey description',
        dueDate: new Date().toDateString(),
        questions: [],
    }

    constructor(private api: StudiesApi) {}

    editSurveyData(survey: Survey, isEditing: boolean) {
        survey.isEditing = isEditing
    }

    getEnumTextValue(survey: Survey) {
        if (survey.repeatingSchedule == this.schedule.none) {
            return 'Does not repeat'
        } else if (survey.repeatingSchedule == this.schedule.always) {
            return 'Always available'
        } else if (survey.repeatingSchedule == this.schedule.daily) {
            return 'Repeats daily'
        } else if (survey.repeatingSchedule == this.schedule.weekly) {
            return 'Repeats weekly'
        } else if (survey.repeatingSchedule == this.schedule.monthly) {
            return 'Repeats monthly'
        }
    }

    toggleEdit(question: Question) {
        question.isEditing = !question.isEditing
    }

    moveQuestionUp(question: Question) {
        const index = this.survey.questions.indexOf(question)
        if (index > 0) {
            ;[this.survey.questions[index], this.survey.questions[index - 1]] = [
                this.survey.questions[index - 1],
                this.survey.questions[index],
            ]
        }
    }

    moveQuestionDown(question: Question) {
        const index = this.survey.questions.indexOf(question)
        if (index < this.survey.questions.length - 1) {
            ;[this.survey.questions[index], this.survey.questions[index + 1]] = [
                this.survey.questions[index + 1],
                this.survey.questions[index],
            ]
        }
    }

    addQuestion() {
        this.survey.questions.push({
            textHtml: '',
            type: QuestionTypes.bool,
            isEditing: true,
            options: [],
        })
    }

    removeQuestion(question: Question) {
        const index = this.survey.questions.indexOf(question)
        if (index > -1) {
            this.survey.questions.splice(index, 1)
        } else {
            this.survey.questions.pop()
        }
    }

    addOption(question: Question) {
        question.options.push({
            label: '',
            value: '',
        })
    }

    removeOption(question: Question, option) {
        const index = question.options.indexOf(option)
        if (index > -1) {
            question.options.splice(index, 1)
        }
    }

    saveResponse(question: Question) {
        this.toggleEdit(question)
    }

    onTypeChange(value: QuestionTypes, question: Question) {
        switch (value) {
            case QuestionTypes.bool:
                break
            case QuestionTypes.check:
                question.options = [{ label: '', value: '' }]
                break
            case QuestionTypes.slider:
                question.startLabel = 'START'
                question.endLabel = 'END'
                question.min = 1
                question.max = 6
                question.step = 1

                //If we want to make min/max number options dynamic
                //question.minNumbers = Array(question.max - question.min).fill(null).map((x,i)=>i + 1);
                //question.maxNumbers = Array(11 - question.min).fill(null).map((x,i)=>i + 1 + question.min);
                break
            case QuestionTypes.radio:
                question.options = [{ label: '', value: '' }]
                break
            case QuestionTypes.text:
                question.placeholder = 'Enter response here...'
                break
            default:
                break
        }
    }

    saveSurvey() {
        const formattedSurvey = { ...this.survey }
        formattedSurvey.questions.forEach((question: Question) => {
            delete question.isEditing
            switch (question.type) {
                case QuestionTypes.slider:
                    delete question.options
                    delete question.placeholder
                    break
                case QuestionTypes.bool:
                    delete question.options
                // eslint-disable-next-line no-fallthrough
                case QuestionTypes.check:
                case QuestionTypes.radio:
                    delete question.startLabel
                    delete question.endLabel
                    delete question.min
                    delete question.max
                    delete question.step
                    delete question.placeholder
                    break
                case QuestionTypes.text:
                    delete question.options
                    delete question.startLabel
                    delete question.endLabel
                    delete question.min
                    delete question.max
                    delete question.step
                    break
            }
        })
        this.api.createSurvey(this.survey).subscribe()
    }
}
