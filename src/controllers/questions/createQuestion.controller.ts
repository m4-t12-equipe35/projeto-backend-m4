import { Request, Response } from "express";
import { IQuestionRequest } from "../../interfaces/questions";
import createQuestionService from "../../services/questions/createQuestion.service";

const createQuestionController = async (req: Request, res: Response) => {
  const questionRequest: IQuestionRequest = req.body;
  const newQuestion = await createQuestionService(questionRequest);
  return res.status(201).json(newQuestion);
}

export default createQuestionController;