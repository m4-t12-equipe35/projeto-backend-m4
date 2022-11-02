import { Router } from "express";

import createTechController from "../controllers/Techs/createTech.controller";
import listTehcsController from "../controllers/Techs/listTechs.controller";

const techsRoutes = Router();

techsRoutes.post("/tech", createTechController);
techsRoutes.get("/tech", listTehcsController)
techsRoutes.delete("/tech/:id",)

export default techsRoutes;
