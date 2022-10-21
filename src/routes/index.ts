import { Express } from "express";
import { categoryRoutes } from "./categories.routes";
import { propertyRoutes } from "./properties.routes";
import { scheduleRoutes } from "./schedules.routes";
import { sessionRoutes } from "./session.routes";
import { userRoutes } from "./users.routes";

export const appRoutes = (app: Express) => {
  app.use("/login", sessionRoutes());
  app.use("/users", userRoutes());
  app.use("/categories", categoryRoutes());
  app.use("/properties", propertyRoutes());
  app.use("/schedules", scheduleRoutes());
};
