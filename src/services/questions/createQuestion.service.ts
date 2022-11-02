import AppDataSource from "../../data-source";
import { Questions } from "../../entities/question.entity";
import { IQuestionRequest } from "../../interfaces/questions";

const createQuestionService = async ({ question, level, techId }: IQuestionRequest): Promise<Questions> => {
  const questionRepository = AppDataSource.getRepository(Questions);

  /* checagem do techId
  const techRepository = AppDataSource.getRepository(Techs);
  const checkTech = techRepository.findOneBy({id: techId});
  if(!checkTech) {
    throw new AppError("Tech not exist", 404);
  }; */

  const newQuestion = questionRepository.create({
    question,
    level,
    // techId
  });

  await questionRepository.save(newQuestion);
  return newQuestion;
}

export default createQuestionService