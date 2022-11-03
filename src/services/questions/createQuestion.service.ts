import AppDataSource from "../../data-source";
import { Questions } from "../../entities/question.entity";
import { Tech } from "../../entities/tech.entity";
import { AppError } from "../../errors/appError";
import { IQuestionRequest } from "../../interfaces/questions";

const createQuestionService = async ({ question, level, techId }: IQuestionRequest): Promise<Questions> => {
  const questionRepository = AppDataSource.getRepository(Questions);
  const techRepository = AppDataSource.getRepository(Tech);

  const checkTech = await techRepository.findOneBy({ id: techId });
  if (!checkTech) {
    throw new AppError(404, "Tech not exist");
  };

  const newQuestion = questionRepository.create({
    question,
    level,
    tech: checkTech,
  });

  await questionRepository.save(newQuestion);
  return newQuestion;
}

export default createQuestionService