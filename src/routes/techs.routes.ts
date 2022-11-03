import { Router } from "express";

import createTechController from "../controllers/Techs/createTech.controller";
import listTechsController from "../controllers/Techs/listTechs.controller";
import deleteQuestionController from "../controllers/questions/deleteQuestion.controller";

const techsRoutes = Router();

techsRoutes.post("/", createTechController);
techsRoutes.get("/", listTechsController);
techsRoutes.delete("/:id", deleteQuestionController);

export default techsRoutes;
