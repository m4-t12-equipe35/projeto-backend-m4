import { Request, Response } from 'express'
import listTechsService from '../../services/tech/listTech.service'

const listTehcsController = async (req: Request, res: Response) => {

        const users = await listTechsService()
        
        return res.status(200).json(users)

}

export default listTehcsController
