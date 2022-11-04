import { Request, Response } from "express";
import { IQuestionUpdate } from "../../interfaces/questions";
import updateQuestionService from "../../services/questions/updateQuestion.service";

const updateQuestionController = async (req: Request, res: Response) => {
  const question: IQuestionUpdate = req.body;
  const id: string = req.params.id;

  const updatedQuestion = await updateQuestionService(question, id);
  return res.status(200).json(updatedQuestion);
};

export default updateQuestionController;
