import AppDataSource from "../../data-source";
import { Questions } from "../../entities/question.entity";
import { AppError } from "../../errors/appError";

const listQuestionsByIdService = async (idQuestion: string) => {
  const questionRepository = AppDataSource.getRepository(Questions);

  const questions = await questionRepository.findOne({
    where: {
      id: idQuestion,
    },
    relations: {
      tech: true,
    },
  });

  if (!questions) {
    throw new AppError(404, "Question not found");
  }

  return questions;
};

export default listQuestionsByIdService;
