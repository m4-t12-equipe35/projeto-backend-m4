import { Request, Response } from "express";
import createUserService from "../../services/users/createUser.service";

const createUserController = async (req: Request, res: Response) => {
  const { name, email, stack, password, isAdm } = req.body;

  const noPwdUser = await createUserService({
    name,
    email,
    stack,
    password,
    isAdm,
  });

  return res.status(201).json(noPwdUser);
};

export default createUserController;
