import { Router } from "express";

import createQuestionController from "../controllers/questions/createQuestion.controller";
import listQuestionsController from "../controllers/questions/listQuestions.controller";
import retrieveQuestionController from "../controllers/questions/retrieveQuestion.controller";
import updateQuestionController from "../controllers/questions/updateQuestion.controller";
import deleteQuestionController from "../controllers/questions/deleteQuestion.controller";

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
questionsRoutes.patch(
  "/:id",
  ensureAuthTokenMiddleware,
  ensureIsAdmMiddleware,
  updateQuestionController
);
questionsRoutes.delete(
  "/:id",
  ensureAuthTokenMiddleware,
  ensureIsAdmMiddleware,
  deleteQuestionController
);

export default questionsRoutes;
