import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors/appError";

const retrieveUserService = async (id: string): Promise<User> => {
  const userRepository = AppDataSource.getRepository(User);

  const user = await userRepository.findOneBy({
    id,
  });

  if (!user) {
    throw new AppError(404, "User not found");
  }

  return user;
};

export default retrieveUserService;
