import AppDataSource from "../../data-source";
import { Questions } from "../../entities/question.entity";

const listQuestionsService = async (): Promise<Questions[]> => {
  const questionRepository = AppDataSource.getRepository(Questions);
  const questions = await questionRepository.find();
  return questions;
}

export default listQuestionsService;