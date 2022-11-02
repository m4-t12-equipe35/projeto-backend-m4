import AppDataSource from "../../data-source";
import { Tech } from "../../entities/tech.entity";
import { AppError } from "../../errors/appError";

const deleteCategoryService = async (id: string): Promise<void> => {
  const techRepository = AppDataSource.getRepository(Tech);
  const tech = await techRepository.findOneBy({
    id,
  });

  if (!tech) {
    throw new AppError(404, "Technology not found.");
  }

  techRepository.delete(id);
};

export default deleteCategoryService;
