import { NextFunction, Request, Response } from "express";
import AppDataSource from "../data-source";
import { User } from "../entities/user.entity";

const verifyDeleteMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  const userRepository = AppDataSource.getRepository(User);

  const users = await userRepository.find();

  const foundUser = users.find((user) => user.id === id);

  if (!foundUser) {
    return res.status(404).json({
      message: "User not found",
    });
  } else if (foundUser.isActive === false) {
    return res.status(400).json({ message: "User is already inactive" });
  }

  return next();
};

export default verifyDeleteMiddleware;
