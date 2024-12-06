import express, { Request, Response } from "express";
import { serverEnv } from "./env/serverEnv";
import cors from "cors";
import { MESSAGES } from "./messages";
import { timeStamp } from "./constants";
import { PATH_ROOT } from "./paths";
import { router as promptRouter } from "./routers/promptRouters";
import { router as apiSpecRouter } from "./routers/apiRoute";
console.log("staring server");
const app = express();
app.use(express.json());
app.use(cors());
app.use(PATH_ROOT.PROMPTS_ROOT, promptRouter);
app.use(PATH_ROOT.API_ROOT, apiSpecRouter);

try {
  app.listen(serverEnv.port, () => {
    console.log(MESSAGES.STARTED, serverEnv.port, timeStamp());
  });
} catch (err: any) {
  console.log(err);
}
