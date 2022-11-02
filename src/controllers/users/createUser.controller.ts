import { Request, Response } from "express";
import { instanceToPlain } from "class-transformer";

import createUserService from "../../services/users/createUser.service";

const createUserController = async (req: Request, res: Response) => {
  const { name, email, stack, password, isAdm, isActive } = req.body;

  const user = await createUserService({
    name,
    email,
    stack,
    password,
    isAdm,
    isActive,
  });

  return res.status(201).json(instanceToPlain(user));
};

export default createUserController;
