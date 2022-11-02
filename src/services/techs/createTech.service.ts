import AppDataSource from "../../data-source";

import { ITechRequest, ITech } from "../../interfaces/techs/index";

import { AppError } from "../../errors/appError";
import { Tech } from "../../entities/tech.entity";

const createTechService = async ({
  name,
  stack,
}: ITechRequest): Promise<ITech> => {
  const techRepository = AppDataSource.getRepository(Tech);

  const tech = await techRepository.find({
    where: {
      name: name,
    },
  });

  if (tech.length !== 0) {
    throw new AppError(409, "Tech already registered");
  }
  const newTech = techRepository.create({
    name,
    stack,
  });

  await techRepository.save(newTech);

  return newTech;
};

export default createTechService;
