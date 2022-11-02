import { Router } from "express";

import createTechController from "../controllers/techs/createTech.controller";
import listTechsController from "../controllers/techs/listTechs.controller";

const techsRoutes = Router();

techsRoutes.post("/", createTechController);
techsRoutes.get("/", listTechsController);
techsRoutes.delete("/:id");

export default techsRoutes;
