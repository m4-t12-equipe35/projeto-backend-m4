import { Request, Response } from "express";
import { instanceToPlain } from "class-transformer";
import { IUserUpdate } from "../../interfaces/users";
import { User } from "../../entities/user.entity";
import updateUserService from "../../services/users/updateUser.service";

const updateUserController = async (req: Request, res: Response) => {
  const user: IUserUpdate = req.body;
  const id: string = req.params.id;
  const updatedUser = await updateUserService(user, id);
  if (updatedUser instanceof User) {
    return res.json(instanceToPlain(updatedUser));
  }
  return res.status(updatedUser[1] as number).json({
    message: updatedUser[0],
  });
};

export default updateUserController;
