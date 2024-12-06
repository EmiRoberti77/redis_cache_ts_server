import express, { Request, Response } from "express";
import { serverEnv } from "./env/serverEnv";
import cors from "cors";
import { MESSAGES } from "./messages";
import { ERR_MSGS, timeStamp } from "./constants";
import { createPromptIndex } from "./redis/om/omPrompt";
import { console } from "inspector";
import { Repository } from "redis-om";
import { validatePrompt } from "./validation/promptRequestValidation";
import { PromptParams } from "./models/promptParams";
console.log("staring server");
const app = express();
app.use(express.json());
app.use(cors());
app.put("/", async (req: Request, res: Response) => {
  if (!req.body) {
    res.status(404).json({
      message: ERR_MSGS.MISSING_BODY,
    });
    return;
  }

  if (!validatePrompt(req.body)) {
    res.status(500).json({
      message: validatePrompt.errors,
    });
    return;
  }

  const promptParams: PromptParams = req.body;
  const promptRepo: Repository = await createPromptIndex();
  const entityKey = `${promptParams.user}:${timeStamp()}`;

  const prompt = await promptRepo.save(entityKey, {
    user: promptParams.user,
    question: promptParams.question,
    answer: promptParams.answer,
    dateTime: timeStamp(),
  });

  res.status(200).json({
    timeStamp: timeStamp(),
    entityKey,
    savedData: await promptRepo.fetch(entityKey),
  });
});

app.listen(serverEnv.port, () => {
  console.log(MESSAGES.STARTED, serverEnv.port, timeStamp());
});
