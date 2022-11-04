import AppDataSource from "../../data-source";
import { hash } from "bcryptjs";
import { User } from "../../entities/user.entity";
import { IUserUpdate } from "../../interfaces/users";
import { AppError } from "../../errors/appError";

const updateUserService = async (
  data: IUserUpdate,
  id: string
): Promise<User | Array<string | number>> => {
  const userRepository = AppDataSource.getRepository(User);

  // Verificando se os campos "isAdm", "isActive" ou "id" foram passados na requisição:

  if (data.isAdm !== undefined) {
    throw new AppError(401, "isAdm property can't be upgraded");
  }

  if (data.isActive !== undefined) {
    throw new AppError(401, "isActive property can't be upgraded");
  }

  if (data.id !== undefined) {
    throw new AppError(401, "id property can't be upgraded");
  }

  const findUser = await userRepository.findOneBy({
    id: id,
  });

  if (!findUser || null) {
    throw new AppError(404, "User not found");
  }

  await userRepository.update(id, {
    name: data.name ? data.name : findUser.name,
    email: data.email ? data.email : findUser.email,
    stack: data.stack ? data.stack : findUser.stack,
    password: data.password ? await hash(data.password, 10) : findUser.password,
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
