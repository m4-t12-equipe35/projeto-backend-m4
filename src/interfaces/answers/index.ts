export interface IAnswers {
  id: string;
  question_id: string;
  answer: string;
  isCorrect: boolean;
}

export interface IAnswersRequest {
  question_id: string;
  answer: string;
  isCorrect: boolean;
}
