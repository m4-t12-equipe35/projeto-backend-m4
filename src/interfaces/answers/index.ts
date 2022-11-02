export interface IAnswersRequest {
  question_id: string;
  answer: string;
  isCorrect: boolean;
}

export interface IAnswers extends IAnswersRequest {
  id: string;
}