import { Request, Response } from "express";
import { IUserUpdate } from "../../interfaces/users";
import updateUserService from "../../services/users/updateUser.service";

const updateUserController = async (req: Request, res: Response) => {
  const user: IUserUpdate = req.body;
  const { id } = req.params;
  const updatedUser = await updateUserService(user, id);

  return res.status(200).json(updatedUser);
};

export default updateUserController;
