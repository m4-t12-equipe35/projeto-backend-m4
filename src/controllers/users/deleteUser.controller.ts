import { Request, Response } from "express";
import deleteUserService from "../../services/users/deleteUser.service";

const deleteUserController = async (req: Request, res: Response) => {
  const id: string = req.params.id;
  await deleteUserService(id);
  return res.status(204).send();
};

export default deleteUserController;
