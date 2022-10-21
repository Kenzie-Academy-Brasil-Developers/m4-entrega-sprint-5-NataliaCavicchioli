import { Router } from "express";
import createPropertyController from "../controllers/properties/createProperty.controller";
import listPropertiesController from "../controllers/properties/listProperties.controller";
import ensureAuthMiddleware from "../middlewares/ensureAuth.middleware";
import ensureIsAdmMiddleware from "../middlewares/ensureIsAdm.middleware";

const routes = Router();

export const propertyRoutes = () => {
  routes.post(
    "",
    ensureAuthMiddleware,
    ensureIsAdmMiddleware,
    createPropertyController
  );
  routes.get("", listPropertiesController);

  return routes;
};
