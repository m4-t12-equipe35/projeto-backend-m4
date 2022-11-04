import AppDataSource from "../../data-source";
import { Tech } from "../../entities/tech.entity";

const listTechsService = async (): Promise<Tech[]> => {
  const techRepository = AppDataSource.getRepository(Tech);

  const techs = await techRepository.find();

  return techs;
};

export default listTechsService;
