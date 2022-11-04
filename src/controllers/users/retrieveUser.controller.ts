import { Request, Response } from "express";
import { instanceToPlain } from "class-transformer";
import retrieveUserService from "../../services/users/retrieveUser.service";

const retrieveUserController = async (req: Request, res: Response) => {
  const id: string = req.params.id;
  const usersById = await retrieveUserService(id);
  return res.json(instanceToPlain(usersById));
};

export default retrieveUserController;
