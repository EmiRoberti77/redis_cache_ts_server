import { Router, Request, Response } from "express";
import { PATHS_PROMPT } from "../paths";
import { PromptParams } from "../models/promptParams";
import { createPromptIndex } from "../redis/om/omPrompt";
import { validatePrompt } from "../validation/promptRequestValidation";
import { Repository } from "redis-om";
import { ERR_MSGS, timeStamp } from "../constants";

export const router = Router();

router.put(PATHS_PROMPT.ROOT, async (req: Request, res: Response) => {
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
