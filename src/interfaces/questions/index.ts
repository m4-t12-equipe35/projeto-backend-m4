export interface IQuestionRequest {
  techId: string;
  question: string;
  level: string;
}

export interface IQuestion extends IQuestionRequest {
  id: string;
}

export interface IQuestionUpdate {
  question?: string;
  level?: string;
}
