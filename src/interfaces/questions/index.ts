import { IAnswersRequest, IAnswersTest } from "../answers";

export interface IQuestionRequest {
  techId: string;
  question: string;
  level: string;
  answers: IAnswersRequest[];
}

export interface IQuestion {
  id: string;
  question: string;
  level: string;
}

export interface IQuestionUpdate {
  question?: string;
  level?: string;
}

export interface IQuestionTest {
  techId: string;
  question: string;
  level: string;
  answers: IAnswersTest[];
}
