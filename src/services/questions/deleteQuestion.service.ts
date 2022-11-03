import AppDataSource from "../../data-source";
import { Questions } from "../../entities/question.entity";
import { AppError } from "../../errors/appError";

const deleteQuestionService = async (id: string) => {
  const questionsRepository = AppDataSource.getRepository(Questions);

  const findQuestion = questionsRepository.findOneBy({ id });

  if (!findQuestion) {
    throw new AppError(403, "Question not found");
  }

  questionsRepository.delete(id);
};
export default deleteQuestionService;
