import { Router, Request, Response } from "express";
import { PATHS_API } from "../paths";
import { serverEnv } from "../env/serverEnv";
export const router = Router();

router.get(PATHS_API.ROOT, (req: Request, res: Response) => {
  res.status(200).json({
    serverEnv,
  });
});
