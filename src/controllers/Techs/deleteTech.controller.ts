import { Request, Response, NextFunction } from "express";
import deleteUserService from "../../services/techs/deteleTech.service";

const deleteUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const techId = req.params.id;

  const tech = await deleteUserService(techId);

  return res.status(204).json({ message: "User deleted with sucess!" });
};

export default deleteUserController;
