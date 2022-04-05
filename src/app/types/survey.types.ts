export enum QuestionTypes {
    /** yes or no  */
    bool = 'BOOLEAN',
    /** range 1-5  */
    slider = 'SLIDER',
    /** select one  */
    radio = 'RADIO',
    /** mark all that apply  */
    check = 'CHECK',
    /** free response  */
    text = 'TEXT',
  }

  export class QuestionOption {
    label: string;
    value: number | string; // TODO we need to decide on this
  }

  export class Question {
    id?: string;
    /** The actual question text
     * TODO does Dr. Hart actually care about having the capability of RichText?
     */
    textHtml: string;
    type: QuestionTypes;
    /** used in QuestionType.slider */
    min?: number;
    /** used in QuestionType.slider */
    max?: number;
    /** used in QuestionType.slider */
    step?: number;
    /** used in QuestionType.slider */
    startLabel?: string;
    /** used in QuestionType.slider */
    endLabel?: string;
    /** used in QuestionType.radio, QuestionType.check */
    options?: QuestionOption[];
    /** used in QuestionType.text */
    placeholder?: string;
    isEditing?: boolean; // used only for editing a survey
  }

  export class Survey {
    id?: string;
    title: string;
    isEditing: boolean;
    description: string;
    repeatingSchedule: Schedule;
    dueDate: Date; // TODO figure out what we want to do about survey recurrence
    questions: Question[];
  }

  export enum Schedule {
      none = 'NONE',
      daily = 'DAILY',
      weekly = 'WEEKLY',
      monthly = 'MONTHLY'
  }

  export class SurveyStub {
    id: string;
    title: string;
    description: string;
    dueDate: Date;
  }

  export class SurveyResponse {
    surveyId: string;
    userId: string;
    /**
     * This is an object with keys being question ids. The values are the response answer to the question.
     * TODO we might want to think of a more type secure way to save the responses.
     *  Maybe something like
     *  questionResponses: {
     *      questionId: string;
     *      questionText: string;
     *      responseId: string;
     *      responseValue: any
     *  } This could use some more thinking
     */
    questionMap: unknown;
    createdDate: Date;
  }
