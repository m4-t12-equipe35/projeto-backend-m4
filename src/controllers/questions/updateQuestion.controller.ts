import { Request, Response } from "express";
import { AppError, handleError } from "../../errors/appError";
import { IQuestionUpdate } from "../../interfaces/questions";
import updateQuestionService from "../../services/questions/updateQuestion.service";

const updateQuestionController = async (req: Request, res: Response) => {
  try {
    const question: IQuestionUpdate = req.body;
    const id: string = req.params.id;

    const updatedQuestion = await updateQuestionService(question, id);
    return res.status(200).json(updatedQuestion);
  } catch (err) {
    if (err instanceof AppError) {
      handleError(err, res);
    }
  }
};

export default updateQuestionController;
