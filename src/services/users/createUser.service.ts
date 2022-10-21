import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { IUserRequest } from "../../interfaces/users";
import { hash } from "bcrypt";
import { AppError } from "../../errors/appError";

const createUserService = async ({
  name,
  email,
  password,
  isAdm,
}: IUserRequest) => {
  const userRepository = AppDataSource.getRepository(User);

  if (!password) {
    throw new AppError("Password is missing");
  }

  const hashedPassword = await hash(password, 10);

  const users = await userRepository.find();

  const emailAlreadyExists = users.find((user) => user.email === email);

  if (emailAlreadyExists) {
    throw new AppError("Email already exists", 400);
  }

  const newUser = userRepository.create({
    name,
    email,
    password: hashedPassword,
    isAdm,
  });

  await userRepository.save(newUser);

  return newUser;
};

export default createUserService;
