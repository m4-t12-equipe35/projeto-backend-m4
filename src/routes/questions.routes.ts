import { Router } from "express";
import createQuestionController from "../controllers/questions/createQuestion.controller";
import listQuestionsController from "../controllers/questions/listQuestions.controller";
import retrieveQuestionController from "../controllers/questions/retrieveQuestion.controller";
import ensureAuthTokenMiddleware from "../middlewares/ensureAuthToken.middleware";
import ensureIsAdmMiddleware from "../middlewares/ensureIsAdm.middleware";

const questionsRoutes = Router();

questionsRoutes.post(
  "/",
  ensureAuthTokenMiddleware,
  ensureIsAdmMiddleware,
  createQuestionController
);
questionsRoutes.get(
  "/",
  ensureAuthTokenMiddleware,
  ensureIsAdmMiddleware,
  listQuestionsController
);
questionsRoutes.get(
  "/:id",
  ensureAuthTokenMiddleware,
  ensureIsAdmMiddleware,
  retrieveQuestionController
);

export default questionsRoutes;
