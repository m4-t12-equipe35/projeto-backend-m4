import { Request, Response } from "express";
import retrieveQuestionService from "../../services/questions/retrieveQuestion.service";

const retrieveQuestionController = async (req: Request, res: Response) => {
  const idQuestion = req.params.id;

  const listQuestionsById = await retrieveQuestionService(idQuestion);
  return res.json(listQuestionsById);
};

export default retrieveQuestionController;
