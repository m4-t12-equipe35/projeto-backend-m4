import { Router } from "express";

import createUserController from "../controllers/users/createUser.controller";
import listUsersController from "../controllers/users/listUsers.controller";

const usersRoutes = Router();

usersRoutes.post("", createUserController);
usersRoutes.get("", listUsersController);

export default usersRoutes;
