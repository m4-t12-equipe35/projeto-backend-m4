import AppDataSource from "../../data-source";
import { Questions } from "../../entities/question.entity";
import { AppError } from "../../errors/appError";
import { IQuestionUpdate } from "../../interfaces/questions";

const updateQuestionService = async (
  { question, level }: IQuestionUpdate,
  id: string
): Promise<Questions | null> => {
  const questionsRepository = AppDataSource.getRepository(Questions);
  const findQuestion = await questionsRepository.findOneBy({ id });

  if (!findQuestion) {
    throw new AppError(404, "Question not found");
  }

  await questionsRepository.update(id, {
    question: question ? question : findQuestion.question,
    level: level ? level : findQuestion.level,
  });

  const questionUpdated = await questionsRepository.findOneBy({ id });
  return questionUpdated;
};

export default updateQuestionService;
