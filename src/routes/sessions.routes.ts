import { Router } from "express";
import sessionLoginController from "../controllers/sessions/sessionLogin.controller";

const sessionsRouters = Router();

sessionsRouters.post("", sessionLoginController);

export default sessionsRouters