import { instanceToPlain } from "class-transformer";
import { Request, Response } from "express";
import listUsersService from "../../services/users/listUsers.service";

const listUsersController = async (req: Request, res: Response) => {
  const users = await listUsersService();
  return res.json(instanceToPlain(users)); // traz todos os usuarios sem a senha
};

export default listUsersController;
