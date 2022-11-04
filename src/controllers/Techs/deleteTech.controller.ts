import { Request, Response } from "express";
import deleteUserService from "../../services/techs/deleteTech.service";

const deleteUserController = async (req: Request, res: Response) => {
  const techId = req.params.id;

  await deleteUserService(techId);

  return res.status(204).send();
};

export default deleteUserController;
