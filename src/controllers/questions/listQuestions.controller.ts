import { Request, Response } from "express";
import listQuestionsService from "../../services/questions/listQuestions.service";

const listQuestionsController = async (req: Request, res: Response) => {
  const questions = await listQuestionsService();
  return res.status(200).json(questions);
};

export default listQuestionsController;
