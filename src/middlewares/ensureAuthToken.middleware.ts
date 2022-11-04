import { Request, Response, NextFunction } from "express";
import Jwt from "jsonwebtoken";
import "dotenv/config";

const ensureAuthTokenMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "Missing token" });
  }

  token = token.split(" ")[1];

  Jwt.verify(token, process.env.SECRET_KEY as string, (err, decoded: any) => {
    if (err) {
      return res.status(401).json({
        message: "Invalid token",
      });
    }

    req.user = {
      id: decoded.sub,
      isAdm: decoded.isAdm,
    };

    return next();
  });
};

export default ensureAuthTokenMiddleware;
