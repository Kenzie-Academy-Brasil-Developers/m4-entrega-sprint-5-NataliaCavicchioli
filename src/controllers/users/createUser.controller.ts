import { Request, Response } from "express";
import { IUserRequest } from "../../interfaces/users";
import createUserService from "../../services/users/createUser.service";
import { instanceToPlain } from "class-transformer";

const createUserController = async (req: Request, res: Response) => {
  const user: IUserRequest = req.body;
  const newUser = await createUserService(user);

  return res.status(201).json(instanceToPlain(newUser));
};

export default createUserController;
