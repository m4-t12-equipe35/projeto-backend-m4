import { Request, Response } from "express";
import listQuestionsByIdService from "../../services/questions/listQuestionsById.service";

const listQuestionsByIdController = async (req: Request, res: Response) => {
  const idQuestion = req.params.id;

  const listQuestionsById = await listQuestionsByIdService(idQuestion);
  return res.json(listQuestionsById);
};

export default listQuestionsByIdController;
