import  AppDataSource from "../../data-source"
import { Tech } from "../../entities/tech.entity"

const listTechsService = async () => {

    const techRepository = AppDataSource.getRepository(Tech)

    const techs = techRepository.find()

    return techs
}

export default listTechsService