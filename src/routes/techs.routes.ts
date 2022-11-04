import { Router } from "express";

import createTechController from "../controllers/techs/createTech.controller";
import listTechsController from "../controllers/techs/listTechs.controller";
import deleteTechController from "../controllers/techs/deleteTech.controller";

const techsRoutes = Router();

techsRoutes.post("/", createTechController);
techsRoutes.get("/", listTechsController);
techsRoutes.delete("/:id", deleteTechController);

export default techsRoutes;
