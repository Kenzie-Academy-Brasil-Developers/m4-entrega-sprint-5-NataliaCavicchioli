import { Request, Response } from "express";
import createSessionService from "../../services/sessions/createSession.service";

const createSessionController = async (req: Request, res: Response) => {
  const user = req.body;
  const token = await createSessionService(user);

  return res.status(200).json({ token });
};

export default createSessionController;
