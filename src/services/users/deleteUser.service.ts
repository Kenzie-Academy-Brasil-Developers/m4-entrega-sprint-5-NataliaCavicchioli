import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors/appError";

const deleteUserService = async (id: string) => {
  const userRepository = AppDataSource.getRepository(User);

  const users = await userRepository.find();
  const findUser = users.find((user) => user.id === id);

  if (!findUser) {
    throw new AppError("User not found", 404);
  }

  if (!findUser.isActive) {
    throw new AppError("User is already inactive", 409);
  }

  await userRepository.update(id, {
    isActive: false,
  });
};

export default deleteUserService;
