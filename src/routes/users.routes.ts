import { Router } from "express";
import createUserController from "../controllers/users/createUser.controller";
import deleteUserController from "../controllers/users/deleteUser.controller";
import listUsersController from "../controllers/users/listUsers.controller";
import updateUserController from "../controllers/users/updateUser.controller";
import ensureAuthMiddleware from "../middlewares/ensureAuth.middleware";
import ensureIsAdmMiddleware from "../middlewares/ensureIsAdm.middleware";
import verifyDeleteMiddleware from "../middlewares/verifyDelete.middleware";
import verifyUpdateMiddleware from "../middlewares/verifyUpdate.middleware";

const routes = Router();

export const userRoutes = () => {
  routes.post("", createUserController);
  routes.get(
    "",
    ensureAuthMiddleware,
    ensureIsAdmMiddleware,
    listUsersController
  );

  routes.patch(
    "/:id",
    ensureAuthMiddleware,
    verifyUpdateMiddleware,
    updateUserController
  );
  routes.delete(
    "/:id",
    ensureAuthMiddleware,
    ensureIsAdmMiddleware,
    verifyDeleteMiddleware,
    deleteUserController
  );

  return routes;
};
