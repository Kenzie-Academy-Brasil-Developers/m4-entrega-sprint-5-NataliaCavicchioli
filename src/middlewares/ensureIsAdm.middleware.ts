import { Request, Response, NextFunction } from "express";

const ensureIsAdmMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.user.isAdm) {
    return res.status(403).json({ message: "You are not authorized" });
  }

  return next();
};

export default ensureIsAdmMiddleware;
