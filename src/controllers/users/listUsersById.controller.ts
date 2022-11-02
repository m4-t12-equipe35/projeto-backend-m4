import { Request, Response } from "express";
import { instanceToPlain } from "class-transformer";
import listUsersByIdService from "../../services/users/listUsersById.service";

const listUsersByIdController = async (req: Request, res: Response) => {
  const id = req.params.id;
  const usersById = await listUsersByIdService(id);
  return res.json(instanceToPlain(usersById));
};

export default listUsersByIdController;
