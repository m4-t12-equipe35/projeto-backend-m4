import AppDataSource from "../../data-source";
import { Questions } from "../../entities/question.entity";
import { AppError } from "../../errors/appError";

const deleteQuestionService = async (id: string): Promise<void> => {
  const questionsRepository = AppDataSource.getRepository(Questions);

  const findQuestion = await questionsRepository.findOneBy({
    id,
  });

  if (!findQuestion) {
    throw new AppError(404, "Question not found");
  }

  questionsRepository.delete(id);
};

export default deleteQuestionService;
