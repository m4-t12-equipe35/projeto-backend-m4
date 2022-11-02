import { Router } from "express";

import createUserController from "../controllers/users/createUser.controller";
import deleteUserController from "../controllers/users/deleteUser.controller";
import listUsersController from "../controllers/users/listUsers.controller";
import listUsersByIdController from "../controllers/users/listUsersById.controller";

const usersRoutes = Router();

usersRoutes.post("", createUserController);
usersRoutes.get("", listUsersController);
usersRoutes.get("/:id", listUsersByIdController);
usersRoutes.delete("/:id", deleteUserController);

export default usersRoutes;
