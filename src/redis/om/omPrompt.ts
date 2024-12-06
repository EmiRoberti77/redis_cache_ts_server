import { Repository, Schema, Entity } from "redis-om";
import { createRedisClient } from "../client";
import { CreateIndexException } from "./exceptions/createIndexException";
import { MESSAGES } from "../../messages";

const promptSchema = new Schema(
  "prompt",
  {
    question: { type: "string" },
    answer: { type: "string" },
    user: { type: "string" },
    dateTime: { type: "date" },
  },
  {
    dataStructure: "JSON",
  }
);

export const initPromptRepository = async (): Promise<Repository> => {
  const carRepository: Repository = new Repository(
    promptSchema,
    await createRedisClient()
  );
  return carRepository;
};

export const createPromptIndex = async (
  repo: Repository
): Promise<Repository> => {
  try {
    await repo.createIndex();
    console.log(MESSAGES.INDEX_CREATED);
    return repo;
  } catch (err: any) {
    throw new CreateIndexException(err.messsge);
  }
};
