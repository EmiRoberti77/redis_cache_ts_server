import { Request, Response, NextFunction } from "express";
import { AUTHENTICATION } from "../constants";
import { serverEnv } from "../env/serverEnv";
export const authenticateKey = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const apiKey = req.header(AUTHENTICATION.X_API_KEY);
  if (apiKey === serverEnv.apiKey) {
    console.log(AUTHENTICATION.AUTHENTICATION_PASS);
    next();
    return;
  }
  console.log(AUTHENTICATION.AUTHENTICATION_FAIL);
  res.status(403).json({
    message: AUTHENTICATION.AUTHENTICATION_FAIL,
  });
};
