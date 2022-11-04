import AppDataSource from "../../data-source";
import { Answers } from "../../entities/answer.entity";
import { Questions } from "../../entities/question.entity";
import { Tech } from "../../entities/tech.entity";
import { AppError } from "../../errors/appError";
import { IAnswersRequest } from "../../interfaces/answers";
import { IQuestionRequest, IQuestion } from "../../interfaces/questions";

function verifyAnswers(answers: IAnswersRequest[]) {
  if (!answers || answers.length !== 4) {
    throw new AppError(400, "Each question needs 4 possible answers");
  }

  const checkCorrectAnswer = answers.filter(
    (answer) => answer.isCorrect === true
  );
  if (checkCorrectAnswer.length === 0) {
    throw new AppError(400, "Your question doesn't have a correct answer");
  }
  if (checkCorrectAnswer.length !== 1) {
    throw new AppError(400, "Each question needs only 1 correct answer");
  }

  return answers;
}

const createQuestionService = async ({
  question,
  level,
  techId,
  answers,
}: IQuestionRequest): Promise<IQuestion> => {
  const questionRepository = AppDataSource.getRepository(Questions);
  const techRepository = AppDataSource.getRepository(Tech);
  const answersRepository = AppDataSource.getRepository(Answers);

  const checkTech = await techRepository.findOneBy({ id: techId });
  if (!checkTech) {
    throw new AppError(404, "Tech not found");
  }

  const newQuestion = questionRepository.create({
    question,
    level,
    tech: checkTech,
  });
  await questionRepository.save(newQuestion);

  verifyAnswers(answers);

  answers
    .map((answer) => {
      return { ...answer, question: newQuestion };
    })
    .forEach(async (answer) => {
      answersRepository.create(answer);
      await answersRepository.save(answer);
    });

  const completeQuestion = { ...newQuestion, answers }; // Adicionando o array de answers na resposta da requisição.

  return completeQuestion;
};

export default createQuestionService;
