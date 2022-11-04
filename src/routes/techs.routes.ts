import { Router } from "express";

import createTechController from "../controllers/techs/createTech.controller";
import listTechsController from "../controllers/techs/listTechs.controller";
import deleteTechController from "../controllers/techs/deleteTech.controller";

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
