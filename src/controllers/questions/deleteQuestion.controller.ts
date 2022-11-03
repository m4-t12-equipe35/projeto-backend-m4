import { Request, Response } from "express";
import { AppError, handleError } from "../../errors/appError";
import deleteQuestionService from "../../services/questions/deleteQuestion.service";
const deleteQuestionController = async (req: Request, res: Response) => {
  try {
    const questionId = req.params.id;

    deleteQuestionService(questionId);

    return res.status(204).send();
  } catch (err) {
    if (err instanceof AppError) {
      handleError(err, res);
    }
  }
};

export default deleteQuestionController;
