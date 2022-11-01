import { compare } from "bcryptjs";
import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors/appError";
import jwt from "jsonwebtoken";

const sessionLoginService = async (
  email: string,
  password: string
): Promise<string> => {
  const userRepository = AppDataSource.getRepository(User);

  const users = await userRepository.find();

  const user = users.find((user) => user.email === email);

  if (!user) {
    throw new AppError(403, "Invalid email or password");
  }

  const passwordVerify = await compare(password, user.password);

  if (!passwordVerify) {
    throw new AppError(403, "Invalid email or password");
  }

  const token = jwt.sign(
    {
      isAdm: user.isAdm,
    },
    process.env.SECRET_KEY as string,
    {
      expiresIn: "24h",
      subject: user.id,
    }
  );

  return token;
};

export default sessionLoginService;
