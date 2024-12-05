import express, { Request, Response } from "express";
import { serverEnv } from "./env/serverEnv";
import cors from "cors";
import { MESSAGES } from "./messages";
import { timeStamp } from "./constants";
import { createPromptIndex } from "./redis/om/omPrompt";
import { EntityId } from "redis-om";
import { console } from "inspector";
import { Repository } from "redis-om";
const app = express();
app.use(express.json());
app.use(cors());
app.get("/", async (req: Request, res: Response) => {
  const promptRepo: Repository = await createPromptIndex();
  const entityKey = `prompt:${new Date().getTime()}`;

  const prompt = await promptRepo.save(entityKey, {
    user: "emi",
    question: "how far is the moon",
    answer: "the moon is very far from the earth",
  });

  res.status(200).json({
    message: "server up",
    timeStamp: timeStamp(),
    entityKey,
    savedData: await promptRepo.fetch(entityKey),
  });
});
app.listen(serverEnv.port, () => {
  console.log(MESSAGES.STARTED, serverEnv.port, timeStamp());
});
