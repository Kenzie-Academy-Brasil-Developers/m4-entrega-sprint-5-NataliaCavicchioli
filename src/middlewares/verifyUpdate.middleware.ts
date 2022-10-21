import { NextFunction, Request, Response } from "express";

const verifyUpdateMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = req.body;

  if (!req.user.isAdm) {
    return res.status(401).json({ message: "You are not authorized" });
  }

  if ("isActive" in user || "id" in user || "isAdm" in user) {
    return res.status(401).json({ message: "You cannot update it" });
  }

  return next();
};

export default verifyUpdateMiddleware;
