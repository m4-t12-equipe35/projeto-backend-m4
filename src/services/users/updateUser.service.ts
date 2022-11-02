import AppDataSource from "../../data-source";
import { hash } from "bcryptjs";
import { User } from "../../entities/user.entity";
import { IUserUpdate } from "../../interfaces/users";
import { AppError } from "../../errors/appError";

const updateUserService = async (
  { name, email, stack, password }: IUserUpdate,
  id: string
): Promise<User | Array<string | number>> => {
  const userRepository = AppDataSource.getRepository(User);

  const findUser = await userRepository.findOneBy({
    id: id,
  });

  if (!findUser || null) {
    throw new AppError(404, "User not found");
  }

  await userRepository.update(id, {
    name: name ? name : findUser.name,
    email: email ? email : findUser.email,
    stack: stack ? stack : findUser.stack,
    password: password ? await hash(password, 10) : findUser.password,
  });

  const user = await userRepository.findOneBy({
    id,
  });

  if (!user) {
    throw new AppError(404, "User not found");
  }

  return user;
};

export default updateUserService;
