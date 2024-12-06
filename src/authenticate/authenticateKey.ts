import { Request, Response, NextFunction } from "express";
import { AUTHENTICATION } from "../constants";
export const authenticateKey = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const apiKey = req.header(AUTHENTICATION.X_API_KEY);
  if (apiKey === AUTHENTICATION.API_KEY) {
    console.log(AUTHENTICATION.AUTHENTICATION_PASS);
    next();
    return;
  }
  console.log(AUTHENTICATION.AUTHENTICATION_FAIL);
  res.status(403).json({
    message: AUTHENTICATION.AUTHENTICATION_FAIL,
  });
};
