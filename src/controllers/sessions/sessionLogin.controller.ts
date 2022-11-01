import { Request, Response } from "express";
import sessionLoginService from "../../services/sessions/sessionLogin.service";

const sessionLoginController = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const token = await sessionLoginService(email, password);
  return res.json({ token });
};

export default sessionLoginController;
