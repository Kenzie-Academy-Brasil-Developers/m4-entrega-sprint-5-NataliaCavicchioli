import { Router } from "express";
import createScheduleController from "../controllers/schedules/createSchedule.controller";
import listSchedulesController from "../controllers/schedules/listSchedules.controller";
import ensureAuthMiddleware from "../middlewares/ensureAuth.middleware";
import ensureIsAdmMiddleware from "../middlewares/ensureIsAdm.middleware";

const routes = Router();

export const scheduleRoutes = () => {
  routes.post("", ensureAuthMiddleware, createScheduleController);
  routes.get(
    "/properties/:id",
    ensureAuthMiddleware,
    ensureIsAdmMiddleware,
    listSchedulesController
  );

  return routes;
};
