import AppDataSource from "../../data-source";
import { Tech } from "../../entities/tech.entity";
import { AppError } from "../../errors/appError";
const deleteCategoryService = async (id:string) => {
    const userRepository = AppDataSource.getRepository(Tech);
  const tech = await userRepository.find({
    where: {
      id: id,
    },
  });
    try {
      const res = await userRepository.query(
        "DELETE FROM categories WHERE id = $1 RETURNING *",
        [id]
      );

      if (res.rows.length === 0) {
        
        throw new AppError(404, "This technology don't exist.")
      }

      return res;
    } catch (err : any) {
      throw new AppError(400, err);                
    }
  };
export default deleteCategoryService


    