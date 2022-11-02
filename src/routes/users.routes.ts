import { Router } from "express";

import createUserController from "../controllers/users/createUser.controller";
import listUsersController from "../controllers/users/listUsers.controller";
import retrieveUserController from "../controllers/users/retrieveUser.controller";
import deleteUserController from "../controllers/users/deleteUser.controller";

const usersRoutes = Router();

usersRoutes.post("", createUserController);
usersRoutes.get("", listUsersController);
usersRoutes.get("/:id", retrieveUserController);
usersRoutes.delete("/:id", deleteUserController);

export default usersRoutes;
