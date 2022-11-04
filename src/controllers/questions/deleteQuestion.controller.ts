import { Request, Response } from "express";
import deleteQuestionService from "../../services/questions/deleteQuestion.service";

const deleteQuestionController = async (req: Request, res: Response) => {
  const questionId = req.params.id;

  await deleteQuestionService(questionId);

  return res.status(204).send();
};

export default deleteQuestionController;
