import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";

import * as bcrypt from "bcryptjs";

import { IUserRequest, IUser } from "../../interfaces/users";

import { AppError } from "../../errors/appError";

const createUserService = async ({
  name,
  email,
  stack,
  password,
  isAdm,
}: IUserRequest): Promise<IUser> => {
  const userRepository = AppDataSource.getRepository(User);

  // Verificando se o email já foi utilizado

  const user = await userRepository.find({
    where: {
      email: email,
    },
  });

  if (user.length !== 0) {
    throw new AppError(400, "E-mail already registered");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = userRepository.create({
    name,
    email,
    stack,
    password: hashedPassword,
    isAdm,
  });

  await userRepository.save(newUser);

  return newUser;
};

export default createUserService;
