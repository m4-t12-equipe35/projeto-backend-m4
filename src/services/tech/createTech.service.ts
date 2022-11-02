import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";

import * as bcrypt from "bcryptjs";

import { ITechs , ITechsRequest} from "../../interfaces/techs/index";

import { AppError } from "../../errors/appError";
import { Tech } from "../../entities/tech.entity";

const createTechService = async ({
  name,
  stack
}: ITechsRequest): Promise<ITechs> => {
  const userRepository = AppDataSource.getRepository(Tech);


  const tech = await userRepository.find({
    where: {
      name: name,
    },
  });

  if (name.length !== 0) {
    throw new AppError(400, "Tech already registered");
  }
  const newTech = userRepository.create({
    name,
    stack
  });

  await userRepository.save(newTech);

  return newTech;
};

export default createTechService;
