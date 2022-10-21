import { Request, Response } from "express";
import createScheduleService from "../../services/schedules/createSchedule.service";

const createScheduleController = async (req: Request, res: Response) => {
  const data = req.body;

  const createdSchedule = await createScheduleService(data);

  return res.status(201).json({ message: "Schedule created successfully" });
};

export default createScheduleController;
