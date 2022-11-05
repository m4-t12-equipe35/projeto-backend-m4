import { IUserRequest, IUserLogin } from "../../interfaces/users";
import { ITechRequest } from "../../interfaces/techs";
import { IQuestionTest } from "../../interfaces/questions";

export const mockedAdminData: IUserRequest = {
  name: "Matheus",
  email: "matheus@mail.com",
  stack: "Backend",
  password: "1234",
  isAdm: true,
};

export const mockedNotAdminData: IUserRequest = {
  name: "Mendes",
  email: "mendes@mail.com",
  stack: "Fullstack",
  password: "1234",
  isAdm: false,
};

export const mockedAdminLogin: IUserLogin = {
  email: "matheus@mail.com",
  password: "1234",
};

export const mockedNotAdminLogin: IUserLogin = {
  email: "mendes@mail.com",
  password: "1234",
};

export const mockedTech: ITechRequest = {
  name: "TypeScript",
  stack: "Fullstack",
};

export const mockedQuestion: IQuestionTest = {
  question:
    "Qual o comando em SQL que utilizamos para inserir dados em uma tabela?",
  level: "iniciante",
  techId: "",
  answers: [
    { answer: "POST TABLE", isCorrect: false },
    { answer: "ADD INTO", isCorrect: false },
    { answer: "INSERT INTO", isCorrect: true },
    { answer: "POST INTO", isCorrect: false },
  ],
};

export const mockedInvalidTechQuestion: IQuestionTest = {
  question:
    "Qual o comando em SQL que utilizamos para inserir dados em uma tabela?",
  level: "iniciante",
  techId: "c9bc447d-1b8b-4a87-a770-7fb23831ec47",
  answers: [
    { answer: "POST TABLE", isCorrect: false },
    { answer: "ADD INTO", isCorrect: false },
    { answer: "INSERT INTO", isCorrect: true },
    { answer: "POST INTO", isCorrect: false },
  ],
};

export const mockedNoCorrectAnswer: IQuestionTest = {
  question: "Testando pergunta sem resposta correta.",
  level: "iniciante",
  techId: "",
  answers: [
    { answer: "A", isCorrect: false },
    { answer: "B", isCorrect: false },
    { answer: "C", isCorrect: false },
    { answer: "D", isCorrect: false },
  ],
};

export const mockedTwoCorrectAnswers: IQuestionTest = {
  question: "Testando pergunta com mais de duas respostas corretas.",
  level: "iniciante",
  techId: "",
  answers: [
    { answer: "A", isCorrect: false },
    { answer: "B", isCorrect: false },
    { answer: "C", isCorrect: true },
    { answer: "D", isCorrect: true },
  ],
};
