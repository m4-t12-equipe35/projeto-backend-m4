import { Request, Response } from "express";

import createTechService from "../../services/techs/createTech.service";

const createTechController = async (req: Request, res: Response) => {
  const { name, stack } = req.body;

  const tech = await createTechService({
    name,
    stack,
  });

  return res.status(201).json(tech);
};

export default createTechController;
