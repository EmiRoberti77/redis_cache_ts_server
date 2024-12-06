import { Router, Request, Response } from "express";
import { PATHS_PROMPT } from "../paths";
import { PromptParams } from "../models/promptParams";
import { createPromptIndex, initPromptRepository } from "../redis/om/omPrompt";
import { validatePrompt } from "../validation/promptRequestValidation";
import { Repository } from "redis-om";
import { ERR_MSGS, timeStamp } from "../constants";
import { authenticateKey } from "../authenticate/authenticateKey";

export const router = Router();

router.put(
  PATHS_PROMPT.ROOT,
  authenticateKey,
  async (req: Request, res: Response) => {
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
    const promptRepo: Repository = await initPromptRepository();
    await createPromptIndex(promptRepo);
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
  }
);

router.get(
  PATHS_PROMPT.ROOT_USER_PARAM,
  authenticateKey,
  async (req: Request, res: Response) => {
    if (!req.params) {
      res.status(404).json({
        message: ERR_MSGS.MISSING_PARAM,
      });
      return;
    }
    const user = req.params.user;
    const repo = await initPromptRepository();
    const prompts = await repo
      .search()
      .where("user")
      .equalTo(user)
      .sortDescending("dateTime")
      .return.all();

    console.log(user);
    res.status(200).json({
      prompts,
    });
  }
);
