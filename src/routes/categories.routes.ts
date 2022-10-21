import { Router } from "express";
import createCategoryController from "../controllers/categories/createCategory.controller";
import listCategoriesController from "../controllers/categories/listCategories.controller";
import listPropertiesByCategoryController from "../controllers/categories/listPropertiesByCategory.controller";
import ensureAuthMiddleware from "../middlewares/ensureAuth.middleware";
import ensureIsAdmMiddleware from "../middlewares/ensureIsAdm.middleware";

const routes = Router();

export const categoryRoutes = () => {
  routes.post(
    "",
    ensureAuthMiddleware,
    ensureIsAdmMiddleware,
    createCategoryController
  );
  routes.get("", listCategoriesController);
  routes.get("/:id/properties", listPropertiesByCategoryController);

  return routes;
};
