import { Request, Response } from "express";
import listTechsService from "../../services/techs/listTechs.service";

const listTechsController = async (req: Request, res: Response) => {
  const users = await listTechsService();

  return res.status(200).json(users);
};

export default listTechsController;
