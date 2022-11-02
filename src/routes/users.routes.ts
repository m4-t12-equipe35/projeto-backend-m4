import { Router } from "express";

import createUserController from "../controllers/users/createUser.controller";
import listUsersController from "../controllers/users/listUsers.controller";
import retrieveUserController from "../controllers/users/retrieveUser.controller";
import updateUserController from "../controllers/users/updateUser.controller";
import deleteUserController from "../controllers/users/deleteUser.controller";

import ensureAuthTokenMiddleware from "../middlewares/ensureAuthToken.middleware";
import ensureIsAdmMiddleware from "../middlewares/ensureIsAdm.middleware";
import ensureUserMiddleware from "../middlewares/ensureUser.middleware";

const usersRoutes = Router();

usersRoutes.post("", createUserController);
usersRoutes.get(
  "",
  ensureAuthTokenMiddleware,
  ensureIsAdmMiddleware,
  listUsersController
);
usersRoutes.get(
  "/:id",
  ensureAuthTokenMiddleware,
  ensureIsAdmMiddleware,
  retrieveUserController
);
usersRoutes.patch(
  "/:id",
  ensureAuthTokenMiddleware,
  ensureUserMiddleware,
  updateUserController
);
usersRoutes.delete(
  "/:id",
  ensureAuthTokenMiddleware,
  ensureIsAdmMiddleware,
  deleteUserController
);

export default usersRoutes;
