import { Request, Response, NextFunction } from "express";

const ensureUserMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const uuid = req.params.id;
  const userId = req.user.id;
  const isAdm = req.user.isAdm;

  if (!isAdm && uuid !== userId) {
    return res.status(403).json({
      message: "You don't have permission to update other user data",
    });
  }

  return next();
};

export default ensureUserMiddleware;
