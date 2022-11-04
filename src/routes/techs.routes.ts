import { Router } from "express";

import createTechController from "../controllers/Techs/createTech.controller";
import listTechsController from "../controllers/Techs/listTechs.controller";
import deleteTechController from "../controllers/Techs/deleteTech.controller";

import ensureAuthTokenMiddleware from "../middlewares/ensureAuthToken.middleware";
import ensureIsAdmMiddleware from "../middlewares/ensureIsAdm.middleware";

const techsRoutes = Router();

techsRoutes.post(
  "/",
  ensureAuthTokenMiddleware,
  ensureIsAdmMiddleware,
  createTechController
);
techsRoutes.get("/", listTechsController);
techsRoutes.delete(
  "/:id",
  ensureAuthTokenMiddleware,
  ensureIsAdmMiddleware,
  deleteTechController
);

export default techsRoutes;
