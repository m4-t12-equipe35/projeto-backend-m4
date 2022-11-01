import { Router } from "express";

import createUserController from "../controllers/users/createUser.controller";

const usersRoutes = Router();

usersRoutes.post("", createUserController);

export default usersRoutes;
