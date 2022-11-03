import { IAnswersRequest } from "../answers";

export interface IQuestionRequest {
  techId: string;
  question: string;
  level: string;
  answers: IAnswersRequest[];
}

export interface IQuestion {
  id: string;
  techId: string;
  question: string;
  level: string;
}